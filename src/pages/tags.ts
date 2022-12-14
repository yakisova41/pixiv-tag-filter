import tagsAppendIlust from './tagsAppendIlust';
import axios from 'axios';

/**
 * pixiv 検索API
 * @param word 検索ワード
 * @param pageNumber ページ数
 * @returns 検索結果 
 */
const search = (word : string, pageNumber : number, mode : 'all' | 'r18')=>{
    return new Promise((resolve)=>{
        axios.get(`https://www.pixiv.net/ajax/search/artworks/${word}?word=${word}&order=date_d&mode=${mode}&p=${String(pageNumber)}&s_mode=s_tag&type=all&lang=ja`)
        .then(res => res.data)
        .then((data)=>{
            resolve(data)
        })
    })
}


/**
 * searchで得たデータをソートし指定タグを除外します
 * @param searchKeyword 検索ワード
 * @returns 指定タグを除外したデータ
 */
const sortingData = async (searchKeyword : string)=>{
    
    /**
     * queryを取得
     */
    let query = {};
    location.search.split('?')[1]?.split('&').map(search =>{
        const splited = search.split('=');
        query[splited[0]] = splited[1];
    });

    const pageNumber = query.hasOwnProperty('p')
        ? query['p'] 
        : 1
    ;
    
    const mode = query.hasOwnProperty('mode')
        ? query['mode'] 
        : 'all'
    ;


    /**
     * users検索
     */
    let users = '';
    
    const usersonlymode = localStorage.getItem('pixiv-filter-usersonly');
    if(usersonlymode !== null && usersonlymode !== '0'){
        users = '%20'+ usersonlymode
    }

    /**
     * AI除外
     */
    let aiblock = false;
    if(localStorage.getItem('pixiv-filter-excludeAImode') === '1'){
        aiblock = true
    }
    

    let blocklist = [];
    const blocklistString = localStorage.getItem('pixiv-filter-blocklist')
    if(blocklistString !== null){
        blocklist = blocklistString.split(',');
    }

    let sortcount = 0;

    const searchResponse = await search(searchKeyword + users, pageNumber, mode);


    const ilusts = searchResponse['body']['illustManga']['data'];
    const result = [];
    const length = ilusts.length;
    
    ilusts.forEach((ilustdata : ilust) => {
        let push = true;

        //blocklist内のタグがilustdataのタグ達に含まれる場合
        ilustdata.tags?.forEach(tag =>{
            if(blocklist.includes(tag)){
                push = false;
                sortcount++;
            }
        })

        //aiType 2=AI 1=NotAI
        if(ilustdata.aiType === 2 && aiblock){
            push = false;
            sortcount++;
        }

        if(push){
            result.push(ilustdata)
        }
    });

    console.log(`${sortcount}/${length} sorted!`);

    return result;
}


/**
 * sortingDataの結果をdomに落とし込みます。
 * @param searchKeyword 検索ワード
 */
export const sort = async (searchKeyword : string)=>{
    const sortdata = await sortingData(searchKeyword);
    
    /**
     * domchange時に2つめのul要素があったら、それをremove()
     */
    document.addEventListener('pixiv-domchange', ()=>{
        const ilustsUlElem =  document.querySelector(
            '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(2)'
        );

        if(ilustsUlElem !== null){
            ilustsUlElem.remove();
        }    
    })

    setTimeout(()=>{
        /**
         * div:nth-child(6)内のul要素を取得、nullならdiv:nth-child(5)内を取得
         */
        let ilustsUlElem =  document.querySelector(
            '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)'
        );

        if(ilustsUlElem === null){
            ilustsUlElem =  document.querySelector(
                '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)'
            );
        }



        /**
         * ul要素が存在した場合にそのulを削除後、新しいulelementを作成
         * そのul要素内にlielementをappend
         */
        if(ilustsUlElem !== null){
            const newUl = document.createElement('ul');
            newUl.className = ilustsUlElem.className;
            ilustsUlElem.parentElement.insertBefore(newUl, ilustsUlElem.parentElement.firstChild)
            ilustsUlElem.remove();

            sortdata.forEach((data : ilust)=>{
                if(data.title !== undefined){
                    //lielementをappend
                    tagsAppendIlust({
                        parent:newUl,
                        src:data.url,
                        title:data.title,
                        href:`https://www.pixiv.net/artworks/${data.id}`,
                        createricon:data.profileImageUrl,
                        creatername:data.userName,
                        createrpage:`https://www.pixiv.net/users/${data.userId}`,
                        r18:(data.tags[0] === 'R-18'),
                        r18g:(data.tags[0] === 'R-18G'),
                        pageCount:data.pageCount
                    });
                }
            })
        } 
    },1000)
 
}


interface ilust{
    aiType:number,
    alt:string,
    bookmarkData: null | boolean,
    createDate: string,
    description: string,
    height: number,
    id: string,
    illustType: number,
    isBookmarkable: boolean,
    isMasked: boolean,
    isUnlisted: boolean,
    pageCount: number,
    profileImageUrl: string,
    restrict: number,
    sl: number,
    tags: string[],
    title: string | undefined,
    titleCaptionTranslation: {workTitle: null | string, workCaption: null | string},
    updateDate: string,
    url: string,
    userId: string,
    userName: string,
    width: number,
    xRestrict: number,
}
