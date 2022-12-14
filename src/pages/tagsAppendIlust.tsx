import ReactDOMServer from 'react-dom/server';
import styles from '../styles/tagsBoxstyle.css';

/**
 * 検索結果に表示される個々のliを返します
 */
export default  (
    {   
        parent,
        src,
        title,
        href,
        r18,
        r18g,
        pageCount,
        createricon,
        creatername,
        createrpage
    } : 
    {
        parent:Element,
        src:string,
        title:string,
        href:string,
        r18:boolean,
        r18g:boolean,
        pageCount:number,
        createricon:string,
        creatername:string,
        createrpage:string
    })=>{
        const ilust = document.createElement('li');
        ilust.setAttribute('style', 'margin:0px;display:list-item;text-align:-webkit-match-parent;list-style:none;')
        
        const html = ReactDOMServer.renderToStaticMarkup(
            <div className={styles.jDiQFZ}>
                <div className={styles.hYfnPb}>
                    <div className={styles.fxGVAF}>
                        <a className={styles.kJZXgj} href={href}>
                            <div className={styles.cYUezH}>
                                <img className={styles.erYaF} src={src}/>
                            </div>

                            <div className={styles.Sxcoo}>
                                
                                <div className={styles.liXhix}>
                                    <div className={styles.cIllir}>
                                        <div className={styles.efxZOo}>
                                            {r18&&
                                                <>R-18</>
                                            }

                                            {r18g&&
                                                <>R-18G</>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {pageCount !== 1&&
                                    <div className={styles.hHNegy}>
                                        <div className={styles.kZlOCw}>
                                            <span className={styles.gODLwk}>
                                                <span className={styles.gbNjFx}>
                                                    <svg className={styles.fArvVr}>
                                                        <path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10
                                                            C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1
                                                            C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8
                                                            0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z" transform="">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>{pageCount}</span>
                                        </div>
                                    </div>                                   
                                }
                            </div>
                        </a>

                        <div className={styles.eDNlMk}>
                            <div>
                                <button className={styles.fgVkZi}>
                                    <svg className={styles.dxYRhf} width="32" height="32">
                                        <path d="
                                        M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183
                                        C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5
                                        C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366
                                        C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>  

                                        <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5
                                        C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328
                                        C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5
                                        C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" className={styles.dUurgf +' '+ styles.whitebokuma }></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.jtpclu}>
                    <a className={styles.cwshsL} href={href}>
                        {title}
                    </a>
                </div>

                <div className={styles.jtpclu}>
                    <div className={styles.icsUdQ}>
                        <div className={styles.eMfHJB}>
                            <a href={createrpage}>
                                <div className={styles.hMqBzA}>
                                    <img src={createricon} width="24" height="24"/>
                                </div>
                            </a>
                        </div>

                        <a href={createrpage} className={styles.kghgsn}>{creatername}</a>
                    </div>
                </div>
            </div>
        );
        
        ilust.innerHTML = html;
        parent.appendChild(ilust);

        return ilust;
}

