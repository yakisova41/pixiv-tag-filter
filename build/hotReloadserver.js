const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
const websocket = require('ws')

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))
let host;
let port;
let sockport;
let hot;
packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080
packageJson.userScript.devServer?.websocket? sockport = packageJson.userScript.devServer.websocket : sockport = 5001
packageJson.userScript.devServer?.hot? hot = true: hot = false

if(hot){
    const wserver = new websocket.Server({port:sockport});

    console.log(`\x1b[46m\n\n\x1b[1m HotReload server Running: ws://localhost:${sockport}\n\x1b[49m`)

    wserver.on('connection',(ws)=>{
        ws.send('connect')
    })

    const watcher = chokidar.watch(path.join(__dirname, '/../dist/'))
    watcher.on('ready',()=>{
        watcher.on('change', ()=>{
            wserver.clients.forEach(client => {
                client.send('reload')  
            })
        })    
    })
}