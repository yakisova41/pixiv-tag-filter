import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../styles/controller.css';
import packagejson from '../../package.json';
import language from '../language.json';
import {Setting} from './Setting';

export default ()=>{
    const [darkmode, setDarkmode] = useState(true);
    const [blocklist, setBlocklist] = useState([]);
  
    /**
     * block tags 
     */
    let tagskey = 0;

    const addTagHandler = (e : React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter'){
            if(e.currentTarget.value !== ''){
                const list : string[] = [...blocklist, e.currentTarget.value];
                localStorage.setItem('pixiv-filter-blocklist', list.join(','))
                setBlocklist(list)

                e.currentTarget.value = '';                
            }
        }
    }

    const tagremove = (key : number)=>{
        blocklist.splice(key, 1);
        const list = [...blocklist];
        localStorage.setItem('pixiv-filter-blocklist', list.join(','))
        setBlocklist([...blocklist]);
    }
    
    useEffect(()=>{
        const list = localStorage.getItem('pixiv-filter-blocklist');
        if(list !== null && list !== ''){
            const listarray = list.split(',');
            listarray.filter(Boolean);
            setBlocklist(listarray);
        }
    },[])


    /**
     * switch darkmode
     */
    window.addEventListener('pixiv-domchange', ()=>{
        const body  = document.querySelector('body');
        const color = window.getComputedStyle(body, '').color;

        if(color !== 'rgb(245, 245, 245)'){
            setDarkmode(false);
        }
        else{
            setDarkmode(true);
        }
    })


    /**
     * switch usersonlymode
     */
    let usersonlymode = '0';

    if(localStorage.getItem('pixiv-filter-usersonly') !== null){
        usersonlymode = localStorage.getItem('pixiv-filter-usersonly')
    }
    else{
        localStorage.setItem('pixiv-filter-usersonly', '0')
    }    

    const handleChangeUsers = (e : React.ChangeEvent<HTMLSelectElement>)=>{
        localStorage.setItem('pixiv-filter-usersonly', e.target.value)
    };


    /**
     * translate
     */
    const translate = (text : string)=>{
        const lang = navigator.language;

        if(language[text] && language[text][lang]){
            return language[text][lang];
        }
        else{
            return text;
        }
    }


    return (
        <div 
            className={`${styles.controllerContainer} ${
            darkmode
                ? styles.containerDark 
                : styles.containerLight
            }`}
        >
            <h1 className={styles.toptitle}>Pixiv tag filter</h1>
            <span className={styles.version}>version {packagejson.userScript['@version']}</span>

            <ul className={styles.settings}>
                <Setting text={translate('Search only works bookmarked ilust by many users')}>
                    <select onChange={handleChangeUsers} defaultValue={usersonlymode}>
                        <option value="0">OFF</option>
                        <option value="1">{translate("over 100users")}</option>
                        <option value="2">{translate("over 1000users")}</option>
                        <option value="3">{translate("over 10000users")}</option>
                    </select>
                </Setting>
            </ul>

            <div className={styles.blocklistOuter}>
                <h2 className={styles.blocklistTitle}>{translate('List of tags to exclude')}</h2>

                <ul className={styles.blocklist}>
                    {
                        blocklist.map(blocktag => {
                            const key : number = tagskey;
                            tagskey++;
                            
                            return (
                                <li className={styles.blocktag} key={key}>
                                    #{blocktag}
                                    <button className={styles.removetag} onClick={()=>{tagremove(key)}}>{translate("Remove")}</button>
                                </li>
                            )
                        })
                    }
                </ul>

                <input 
                    type="text" 
                    className={styles.addTagInput} 
                    onKeyDown={addTagHandler}
                    placeholder={translate("Enter the tags name you want to exclude")}
                />
            </div>
        </div>
    )
}