const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const writeUserscriptHeader = require('./writeUserscriptHeader.js')
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')));
const cssModulesPlugin = require('esbuild-ssr-css-modules-plugin').default;

module.exports = (mode)=>{
    /**
     * dev and production common plugins
     */
    const plugins = [
        cssModulesPlugin({    
            jsCSSInject: true
        }),
    ];

    switch(mode){
        case 'build':
            (()=>{
                const config = {
                    logLevel: "info",
                    entryPoints: [
                        path.join(__dirname, '/../src' , 'index.ts')
                    ],
                    define: {
                        'process.env.NODE_ENV': "'production'",
                    },
                    outfile: path.join(__dirname, '/../dist' , 'index.user.js'),
                    bundle: true,
                    plugins:[...plugins, writeUserscriptHeader()]
                };

                if(packageJson.userScript?.esbuild !== undefined){
                    Object.keys(packageJson.userScript.esbuild).forEach((key)=>{
                        config[key] = packageJson.userScript.esbuild[key];
                    });
                }

                esbuild.build(config)
                    .catch(() => process.exit(1));             
            })()

            break;

        case 'dev':
            (()=>{
                const hotReloadCliantconfig = {
                    entryPoints: [
                        path.join(__dirname, 'cliant' , 'index.ts')
                    ],
                    outfile: path.join(__dirname, '/../dist' , 'index.user.js'),
                    bundle: true,
                    plugins:[writeUserscriptHeader()]
                };

                const devConfig = {
                    logLevel: "info",
                    entryPoints: [
                        path.join(__dirname, '/../src' , 'index.ts') 
                    ],
                    outfile: path.join(__dirname, 'tmp' , 'dev.user.js'),
                    bundle: true,
                    watch:true,
                    plugins:plugins
                };

                if(packageJson.userScript?.esbuild !== undefined){
                    Object.keys(packageJson.userScript.esbuild).forEach((key)=>{
                        if(key !== 'entryPoints') {
                            hotReloadCliantconfig[key] = packageJson.userScript.esbuild[key];
                        }
                        devConfig[key] = packageJson.userScript.esbuild[key];
                    });
                }

                esbuild.build(hotReloadCliantconfig)
                    .catch(() => process.exit(1))
                    .then(()=>{
                        esbuild.build(devConfig)
                            .catch(() => process.exit(1))
                    });
            })()

            break;
    }
};