import {sort} from './sortTagsPage';
import createControllerReact from './createControllerReact';

/**
 * notosans cjk jp
 */
(function(d) {
	const config = {
			kitId: 'ove2wbx',
			scriptTimeout: 3000,
			async: true
	};
		let h = d.documentElement;
		let t = setTimeout(function() {
			h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
		}, config.scriptTimeout);
		let tk = d.createElement("script");
		let f = false;
		let s = d.getElementsByTagName("script")[0];
		let a : any;
        h.className += " wf-loading";
        tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
        tk.async = true;
        tk.onload = tk.onreadystatechange = function() {
		a = this.readyState;
		if (f || a && a != "complete" && a != "loaded") return;
		f = true;
		clearTimeout(t);
		try {
			Typekit.load(config)
		} catch (e) {}
	};
	s.parentNode.insertBefore(tk, s)
})(document);


/**
 * ページをまたぐ処理
 */
const callCarryoverFunctions = {
    'redirect':{
        function:(url : string)=>{
            document.querySelector('#root').innerHTML = ''
            location.href = url;
        },
        check:(url : string)=> decodeURI(location.href) === decodeURI(url)
    }
};

/**
 * localstorageからページ間処理を読み込んで実行、チェック
 */
setTimeout(()=>{
    setInterval(async ()=>{
        const isRun = localStorage.getItem('pixiv-filter-carryoverFunction')

        //null
        if(isRun === null){
            localStorage.setItem('pixiv-filter-carryoverFunction', '0')
        }

        //run
        if(isRun === '1'){
            localStorage.setItem('pixiv-filter-carryoverFunction', '2')

            const functionName = localStorage.getItem('pixiv-filter-carryoverFunction-name')
            const arg  = localStorage.getItem('pixiv-filter-carryoverFunction-arg')

            await callCarryoverFunctions[functionName].function(arg)
        }

        //check
        if(isRun === '2'){
            const functionName = localStorage.getItem('pixiv-filter-carryoverFunction-name')
            const arg  = localStorage.getItem('pixiv-filter-carryoverFunction-arg')
            
            if(callCarryoverFunctions[functionName].check(arg)){
                
                localStorage.setItem('pixiv-filter-carryoverFunction', '0')
            }
            else{
                console.error(`[Pixiv tag filter] Failed to do function "${functionName}". Run the function again`);
                localStorage.setItem('pixiv-filter-carryoverFunction', '1');
            }
        }
    },1000);
},1);


/**
 * dom変更の監視
 */
const body = document.querySelector("body");
let bodyTmp = body.innerHTML;
setInterval(()=>{
    if(body.innerHTML !== bodyTmp){
        const domChangeEvent = new CustomEvent('pixiv-domchange');
        window.dispatchEvent(domChangeEvent);
    }
    bodyTmp = document.querySelector("body").innerHTML;
})

/**
 * ページ変更の監視
 */
let pathTmp = '';

setInterval(()=>{
    const path = location.pathname;

    if(pathTmp !== path){
        const pageChangeEvent = new CustomEvent('pixiv-pagechange', {
            detail:{
                new:path,
                before:pathTmp
            }
        });
        window.dispatchEvent(pageChangeEvent);
    }
   
    
    pathTmp = path;
}, 100);

/**
 * routing
 */
const pageChangeHandler = (e : CustomEvent)=>{
    const pathnameSplit = e.detail.new.split('/');
    
    switch(pathnameSplit[1]){
        case 'artworks':
            //イラストページ
            
            break;
        case 'tags':
            //検索画面
            sort(pathnameSplit[2])
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
window.addEventListener('pixiv-pagechange', pageChangeHandler as EventListenerOrEventListenerObject);

window.onload = ()=>{
    createControllerReact();
}
