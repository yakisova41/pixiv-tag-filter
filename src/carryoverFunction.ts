export const callCarryoverFunction = (functionName : string, arg : string) : void=>{
    localStorage.setItem('pixiv-filter-carryoverFunction-name', functionName)
    localStorage.setItem('pixiv-filter-carryoverFunction-arg', arg)
    localStorage.setItem('pixiv-filter-carryoverFunction', `1`)
}