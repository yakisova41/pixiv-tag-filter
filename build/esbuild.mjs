import path from 'path'
import esbuild from 'esbuild'
import { __dirname } from './module/dirname.mjs';
import { getArg } from './module/getArg.mjs';
import developBuild from './developBuild.mjs'
import writeUserscriptHeader from './writeUserscriptHeader.mjs'

let normalBuildconfig = {
    outfile: path.join(__dirname(import.meta.url), '/../dist' , 'index.user.js'),
    entryPoints: [path.join(__dirname(import.meta.url), '/../src' , 'index.ts')],
    bundle: true,
    minify: getArg('minify') === true ? true : false,
    watch: getArg('watch') === true ? true : false,
    plugins: [
    ]
}

if(!getArg('dev')){
    normalBuildconfig.plugins.push(writeUserscriptHeader())
}

esbuild.build(normalBuildconfig).catch(() => process.exit(1))
.then(()=>{
    if(getArg('dev')) {
        let devBuildconfig = {
            outfile: path.join(__dirname(import.meta.url), '/' , 'dev.user.js'),
            entryPoints: [path.join(__dirname(import.meta.url), '/../src' , 'index.ts')],
            bundle: true,
            minify: getArg('minify') === true ? true : false,
            watch: getArg('watch') === true ? true : false,
            plugins: [
                developBuild(),
                writeUserscriptHeader()
            ]
        }
        esbuild.build(devBuildconfig)
    }
})



