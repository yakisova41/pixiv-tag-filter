const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

app.get('/',(req, res)=>{
    const userScript = fs.readFileSync(path.join(__dirname, '/../dist', 'index.user.js'))
    res.send(userScript)
})

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))

packageJson.userScript.devServer?.host? host = packageJson.userScript.devServer.host : host = '127.0.0.1'
packageJson.userScript.devServer?.port? port = packageJson.userScript.devServer.port : port = 8080

app.listen(port, host, ()=>{
    console.log(`dev server Running\nuserScript URL: \u001b[36mhttp://${host}:${port}\u001b[0m`)
})