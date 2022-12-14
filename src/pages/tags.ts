import tagsAppendIlust from './tagsAppendIlust';

/**
 * pixiv 検索API
 * @param word 検索ワード
 * @param pageNumber ページ数
 * @returns 
 */
const search = (word : string, pageNumber : number, mode : 'all' | 'r18')=>{
    return new Promise((resolve)=>{
        fetch(`https://www.pixiv.net/ajax/search/artworks/${word}?word=${word}&order=date_d&mode=${mode}&p=${String(pageNumber)}&s_mode=s_tag&type=all&lang=ja`)
        .then(res => res.body.getReader())
        .then(async (reader)=>{
            const { done, value } = await reader.read();
              
            const decoder = new TextDecoder();
            try {
                return await JSON.parse(decoder.decode(value));
            }
            catch (e) {
                return await JSON.parse(decoder.decode(value));
            }
    
        })
        .then(response =>{
            resolve(response)
        })
    })
}


const sortingData = async (searchKeyword : string)=>{
    //querys
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

    let users = '';

    switch(localStorage.getItem('pixiv-filter-usersonly')){
        case '1':
            users = '00users'
            break;
        case '2':
            users = '000users'
            break;
        case '3':
            users = '0000users'
            break;
    }
    
    let aiblock = false;
    if(localStorage.getItem('pixiv-filter-excludeAImode') === '1'){
        aiblock = true
    }
    
    const searchResponse = await search(searchKeyword + ' ' +users, pageNumber, mode);

    const blocklist = localStorage.getItem('pixiv-filter-blocklist').split(',');
    let sortcount = 0;

    if(searchResponse['error'] === false){
        const ilusts = searchResponse['body']['illustManga']['data'];
        console.log(ilusts)
        const length = ilusts.length;

        ilusts.forEach((ilustdata : ilust) => {
            blocklist.forEach(blocktag =>{
                if(ilustdata.tags?.includes(blocktag)){
                    ilusts.splice(ilusts.indexOf(ilustdata), 1);
                    sortcount++;
                }
            })

            if(ilustdata.aiType === 2 && aiblock){
                ilusts.splice(ilusts.indexOf(ilustdata), 1);
                sortcount++;
            }
        });

        console.log(`${sortcount}/${length} sorted!`);

        return {sortdata:ilusts,sortcount};
    }
}


export const sort = async (searchKeyword : string)=>{
    const {sortdata, sortcount} = await sortingData(searchKeyword);
    
    document.addEventListener('pixiv-domchange', ()=>{
        const ilustsUlElem =  document.querySelector(
            '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(2)'
        );

        if(ilustsUlElem !== null){
            ilustsUlElem.remove();
        }
        
    })

    setTimeout(() => {
        let ilustsUlElem =  document.querySelector(
            '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)'
        );

        if(ilustsUlElem === null){
            ilustsUlElem =  document.querySelector(
                '#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)'
            );
        }
        
        const li = ilustsUlElem.querySelector('li:nth-child(1)')
        
        
        if(ilustsUlElem !== null){
            const newUl = document.createElement('ul');
            newUl.className = ilustsUlElem.className;
            ilustsUlElem.parentElement.insertBefore(newUl, ilustsUlElem.parentElement.firstChild)
            ilustsUlElem.remove();

            sortdata.forEach((data : ilust)=>{
                if(data.title !== undefined){
                    tagsAppendIlust({
                        parent:newUl,
                        base:li,
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
    }, 100);
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
