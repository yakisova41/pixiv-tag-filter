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
            let sockport;
            let hot
            packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
            packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080
            packageJson.userScript.devServer?.websocket? sockport = packageJson.userScript.devServer.websocket : sockport = 5001
            packageJson.userScript.devServer?.hot? hot = true: hot = false

            let scripts = []
            
            if(hot){
                scripts.push(`(()=>{
    const webSocket = new WebSocket("ws://${host}:${sockport}");
    webSocket.onmessage = (event)=>{
    switch(event.data){
        case "reload":
            console.log('[hotReload] reload...')
            window.location.reload();
            break;
        case "connect":
            console.log('[hotReload] connecting ok')
            break;
    }
}})()
                `);
            }

            scripts.push(`import("http://${host}:${port}/script")`);

            fs.writeFileSync(outFile, scripts.join('\n'))
        })
    }
})