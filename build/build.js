module.exports = (mode)=>{
    const esbuild = require('esbuild');
    const fs = require('fs');
    const path = require('path');
    const writeUserscriptHeader = require('./writeUserscriptHeader.js')

    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')));

    switch(mode){
        case 'build':
            (()=>{
                const config = {
                    entryPoints: [
                        path.join(__dirname, '/../src' , 'index.ts')
                    ],
                    outfile: path.join(__dirname, '/../dist' , 'index.user.js'),
                    bundle: true,
                    plugins:[writeUserscriptHeader()]
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
                    entryPoints: [
                        path.join(__dirname, '/../src' , 'index.ts') 
                    ],
                    outfile: path.join(__dirname, 'tmp' , 'dev.user.js'),
                    bundle: true,
                    watch:true
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