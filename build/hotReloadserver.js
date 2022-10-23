const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
const websocket = require('ws')

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))
let host;
let port;
packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080
const wserver = new websocket.Server({port:5001});

console.log('hotreload websocket server: ws://localhost:5001')

const watcher = chokidar.watch(path.join(__dirname, '/../dist/'))
watcher.on('ready',()=>{
    watcher.on('change', ()=>{
        wserver.clients.forEach(client => {
            client.send('reload')  
        })
    })    
})