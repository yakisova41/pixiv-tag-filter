import path from 'path'
import fs from 'fs'
import { __dirname } from './module/dirname.mjs'

export default options => ({
    name:'writeUserscriptHeader',
    setup(build){
        build.onEnd(()=>{
            const outFile = build.initialOptions.outfile
            const buildResult = fs.readFileSync(outFile)
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname(import.meta.url), '/../package.json')))
            
            let userscriptHeaders = []

            userscriptHeaders.push('// ==UserScript==')
            Object.keys(packageJson.userScript).forEach((key)=>{
                if(key[0] === '@'){
                    userscriptHeaders.push(`// ${key} ${packageJson.userScript[key]}`)
                }
            });
            userscriptHeaders.push('// ==/UserScript==')
            

            fs.writeFileSync(outFile, [userscriptHeaders.join('\n'), buildResult].join('\n\n'))
        })
    }
})