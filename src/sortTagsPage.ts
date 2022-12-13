import {callCarryoverFunction} from "./carryoverFunction";

export const sort = (searchKeyword : string)=>{
    const searchtags = decodeURI(searchKeyword).split(' ');

    let filterTags = [];
    let redirect = false;

    if(localStorage.getItem('pixiv-filter-blocklist')){
        localStorage.getItem('pixiv-filter-blocklist').split(',').forEach(tag =>{
            if(!searchtags.includes(`-${tag}`)){
                filterTags.push(`-${tag}`);
                redirect = true;
            }
        })
    }

    const usersOnlymode = localStorage.getItem('pixiv-filter-usersonly')
    if(usersOnlymode === '1' && !searchtags.includes('00users')){
        filterTags.push('00users')
        redirect = true;
    }
    if(usersOnlymode === '2' && !searchtags.includes('000users')){
        filterTags.push('000users')
        redirect = true;
    }
    if(usersOnlymode === '3' && !searchtags.includes('0000users')){
        filterTags.push('0000users')
        redirect = true;
    }

    let queryArray : string[];
    
    if(location.search.split('?').length === 1){
        queryArray = []
    }
    else{
        queryArray = location.search.split('?')[1].split('&');
    }

    if(!queryArray.includes('s_mode=s_tag') && filterTags.length !== 0){
        queryArray.push('s_mode=s_tag')
        redirect = true;        
    }

    if(redirect){
        callCarryoverFunction('redirect', `https://www.pixiv.net/tags/${searchKeyword}%20${filterTags.join('%20')}/artworks?${queryArray.join('&')}`)
        document.querySelector('#root').innerHTML = ''
        history.back()
    }
}