import path from 'path'
import esbuild from 'esbuild'
import { __dirname } from './module/dirname.mjs';
import { getArg } from './module/getArg.mjs';
import developerBuild from './developerBuild.mjs'
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

if(getArg('dev')) {
    let devBuildconfig = {
        outfile: path.join(__dirname(import.meta.url), '/../dist' , 'dev.user.js'),
        entryPoints: [path.join(__dirname(import.meta.url), './' , 'developBuildDistTemplate.ts')],
        bundle: true,
        minify: getArg('minify') === true ? true : false,
        watch: getArg('watch') === true ? true : false,
        plugins: [
            writeUserscriptHeader(),
            developerBuild()
        ]
    }
    esbuild.build(devBuildconfig).catch(() => process.exit(1))
}


