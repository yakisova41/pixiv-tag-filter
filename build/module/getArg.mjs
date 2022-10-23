export const getArg = (name)=>{
    let returnValue = false;

    process.argv.forEach(arg =>{
        const [argname, argvalue] = arg.split('=');
        if(name === argname){
            if(argvalue === undefined){
                returnValue = true;
            }
            else{
                returnValue = argvalue;
            }
        }
    });

    return returnValue;
}