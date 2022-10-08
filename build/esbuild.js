const esbuild = require('esbuild')
const path = require('path')
const writeUserscriptHeader = require('./writeUserscriptHeader')

const argv = process.argv

const buildmode = argv.find((arg)=>{
    return arg === 'watch' || arg === 'build';
});

const minify = argv.some((arg)=>{
    return arg === 'minify';
});

const config = {
    entryPoints: [path.join(__dirname, '/../src' , 'index.ts')],
    bundle: true,
    minify: minify ? true : false,
    watch: buildmode === 'watch' ? true : false,
    outfile: path.join(__dirname, '/../dist' , 'index.user.js'),
    plugins: [
        writeUserscriptHeader()
    ]
}

esbuild.build(config).catch(() => process.exit(1))