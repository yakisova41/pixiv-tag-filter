const fs = require('fs')
const path = require('path')

module.exports = () => ({
    name:'write-userscriptHeader',
    setup(build) {
        const outFile = build.initialOptions.outfile

        build.onEnd(()=>{
            const buildResult = fs.readFileSync(outFile)
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))
            
            let userScriptConfig = []

            if(packageJson.userScript){
                userScriptConfig.push('// ==UserScript==')
                Object.keys(packageJson.userScript).forEach(function (key) {
                    if(key[0] === '@') {
                        userScriptConfig.push(`// ${key} ${packageJson.userScript[key]}`)
                    }
                });
                userScriptConfig.push('// ==/UserScript==')
            }

            fs.writeFileSync(outFile, [userScriptConfig.join('\n'), buildResult].join('\n\n'))
        })
    }
})