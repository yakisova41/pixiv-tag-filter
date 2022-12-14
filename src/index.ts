import {sort} from './pages/tags';
import createController from './createController';

/**
 * dom変更の監視
 */
const body = document.querySelector("body");
let bodyTmp = body.innerHTML;
setInterval(()=>{
    if(body.innerHTML !== bodyTmp){
        const domChangeEvent = new CustomEvent('pixiv-domchange');
        document.dispatchEvent(domChangeEvent);
    }
    bodyTmp = document.querySelector("body").innerHTML;
})

/**
 * ページ変更の監視
 */
let pathTmp = '';
let searchTmp = '';

setInterval(()=>{
    const path = location.pathname;
    const search = location.search;

    if(pathTmp !== path || search !== searchTmp){
        const pageChangeEvent = new CustomEvent('pixiv-pagechange', {
            detail:{
                new:path,
                before:pathTmp,
                newSearch:search,
                beforeSearch:searchTmp,
                ispath:(pathTmp !== path)
            }
        });
        document.dispatchEvent(pageChangeEvent);
    }
    
    pathTmp = path;
    searchTmp = search;
});

/**
 * ページ変更イベント```pixiv-pagechange```があった際、```location.pathname```に適切な関数を実行
 */
const pageChangeHandler = (e : CustomEvent)=>{
    const pathnameSplit = e.detail.new.split('/');

    switch(pathnameSplit[1]){
        case 'artworks':
            //イラストページ
            
            break;

        case 'tags':
            //検索画面
            setTimeout(()=>{
                sort(pathnameSplit[2])
            },100)
            
            document.addEventListener('pixiv-storageChange',()=>{
                sort(pathnameSplit[2])
            });
            
            break;

        case '':
            //トップページ
            break;

        case 'cate_r18.php':
            //r18トップページ
            break;
        
        default:
            break;
    }
}
document.addEventListener('pixiv-pagechange', pageChangeHandler as EventListenerOrEventListenerObject);

/**
 * onload
 * コントローラーを描画
 */
window.onload = ()=>{
    createController();
}
