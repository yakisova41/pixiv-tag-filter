module.exports = options => ({
    name:'writeUserscriptHeader',
    setup(build){
        const fs = require('fs')
        const path = require('path')

        build.onEnd(()=>{
            const outFile = build.initialOptions.outfile
            const buildResult = fs.readFileSync(outFile)
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))
            
            let userscriptHeaders = []

            userscriptHeaders.push('// ==UserScript==')
            Object.keys(packageJson.userScript).forEach((key)=>{
                if(key[0] === '@'){
                    userscriptHeaders.push(`// ${key} ${packageJson.userScript[key]}`)
                }
            });
            userscriptHeaders.push('// ==/UserScript==')
            

            //licence
            userscriptHeaders.push(`
/*
MIT License
Copyright (c) 2022 yakisova41
            
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
            
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/`)

            fs.writeFileSync(outFile, [userscriptHeaders.join('\n'), buildResult].join('\n\n'))
        })
    }
})