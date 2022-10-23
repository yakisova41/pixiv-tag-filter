import express from 'express'
import fs from 'fs'
import path from 'path'
import { __dirname } from './module/dirname.mjs'
import { getArg } from './module/getArg.mjs';

const app = express()

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname(import.meta.url), '/../package.json')))
let host;
let port;
packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080

app.get('/',(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    if(getArg('dev')){
        res.sendFile(path.join(__dirname(import.meta.url), '/../dist/', 'dev.user.js'))
    }
    else{
        res.sendFile(path.join(__dirname(import.meta.url), '/../dist/', 'index.user.js'))
    }
});

app.get('/index',(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname(import.meta.url), '/../dist/', 'index.user.js'))
})

try{
    app.listen(port, host, ()=>{
        console.log(`userscript url:http://${host}:${port}`)
    })
}
catch(err){
    process.exit(1)
}

