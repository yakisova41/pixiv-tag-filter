const args = require('./modules/getArgv')();
const build = require('./build');

if(args['mode'] === 'build'){
    build('build')
}
else{
    build('dev')
}
