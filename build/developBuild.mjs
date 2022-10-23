import path from 'path'
import fs from 'fs'
import { __dirname } from './module/dirname.mjs'

export default options => ({
    name:'hotReloadBuild',
    setup(build){
        build.onEnd(()=>{
            const outFile = build.initialOptions.outfile
            const buildResult = fs.readFileSync(outFile)
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname(import.meta.url), '/../package.json')))
            let host;
            let port;
            packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
            packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080
            
            const hotReloadScript = `import("http://${host}:${port}/index")`;

            fs.writeFileSync(outFile, buildResult +  hotReloadScript)
        })
    }
})