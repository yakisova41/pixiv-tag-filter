/**
 * localstorageへの登録
 * その後```pixiv-storageChange```イベントをdispathします
 * @param name key
 * @param value value
 */
export default (name : string, value : string)=>{
    localStorage.setItem(name, value);
    const lschangeEvent = new CustomEvent('pixiv-storageChange', {
        detail:{
            name,
            value
        }
    });
    document.dispatchEvent(lschangeEvent);
}

export interface StorageChangeEvent{
    name:string,
    value:string
}