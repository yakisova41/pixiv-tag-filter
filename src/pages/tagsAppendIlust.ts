export default  (
    {   
        parent,
        base,
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
        base:Element,
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
        
        parent.querySelector('li:nth-child(1)')

        const outerDiv = base.querySelector('div');

        const ilust = document.createElement('li');
        ilust.className = base.className;
        ilust.innerHTML = `
            <div class="${outerDiv.className}">
                <div type="ilust" class="${outerDiv.children[0].className}">
                    <div class="${
                        outerDiv
                            .children[0]
                            .children[0]
                            .className
                    }">
                        <a class="${
                            outerDiv
                                .children[0]
                                .children[0]
                                .children[0]
                                .className
                        }"
                        href="${href}"
                        >  
                            <div class="${
                                outerDiv
                                    .children[0]
                                    .children[0]
                                    .children[0]
                                    .children[0]
                                    .className
                            }">
                                <img class="${
                                    outerDiv
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .className
                                }"
                                src="${src}"/>
                            </div>

                            <div class="${
                                outerDiv
                                    .children[0]
                                    .children[0]
                                    .children[0]
                                    .children[1]
                                    .className
                            }">
                                <div class="${
                                    outerDiv
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .children[1]
                                        .children[0]
                                        .className
                                }">
                                    <div 
                                        style="padding:0 6px;border-radius:3px;color:#f5f5f5;background:#ff4060;font-weight:700;font-size:10px;line-height:1pc;user-select:none;"
                                    >
                                        ${r18 ? 'R-18' : ''}
                                        ${r18g? 'R-18G' : ''}
                                    </div>
                                </div>
                                    
                                
                                    
                                <div style="justify-content: flex-end;position:absolute;top:0;left:0;right:0;box-sizing:border-box;display:flex;align-items:flex-start;padding:4px 4px 0;pointer-events:none;text-align:-webkit-match-parent;">
                                        ${pageCount > 1 ? `<div
                                            style="display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;flex:0 0 auto;box-sizing:border-box;height:20px;min-width:20px;color:#fff;font-weight:700;padding:0 6px;background:rgba(0,0,0,.32);border-radius:10px;font-size:10px;line-height:10px;"
                                        >
                                            <span style="    color: rgb(255, 255, 255);
                                            font-weight: bold;font-size: 10px;
                                            line-height: 10px;pointer-events: none;">
                                                <span style="display:inline-flex;vertical-align:top;-webkit-box-align:center;align-items:center;height:10px">
                                                    <svg style="stroke:none;fill:currentcolor;width:9px;height:10px;line-height:0;font-size:0;vertical-align:middle;margin-right:2px;">
                                                    <path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10 C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1 C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8 0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z" transform=""></path>
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>${pageCount}</span>
                                        </div>` : ''}
                                </div>                
                            </div>
                        </a>

                        <div class="
                        ${
                            outerDiv
                                .children[0]
                                .children[0]
                                .children[1]
                                .className
                        }
                        ">
                            <!-- ハートボタン　-->
                        </div>
                    </div>
                </div>

                <div class="${outerDiv.children[1].className}">
                    <a class="${
                        outerDiv
                        .children[1]
                        .children[0]
                        .className
                    }"
                    href="${href}"
                    >
                        ${title}
                    </a>
                </div>

                <div class="${outerDiv.children[2].className}">
                    <div class="${
                        outerDiv
                        .children[2]
                        .children[0]
                        .className
                    }">
                        <div class="${
                            outerDiv
                            .children[2]
                            .children[0]
                            .children[0]
                            .className
                        }">
                            <a class="${
                                outerDiv
                                .children[2]
                                .children[0]
                                .children[0]
                                .children[0]
                                .className
                            }">
                                <div class="${
                                    outerDiv
                                    .children[2]
                                    .children[0]
                                    .children[0]
                                    .children[0]
                                    .children[0]
                                    .className
                                }">
                                    <img class="${
                                        outerDiv
                                        .children[2]
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .children[0]
                                        .className   
                                    }"
                                    src=${createricon}
                                    >
                                </div>
                            </a>
                        </div>

                        <a class="${
                            outerDiv
                            .children[2]
                            .children[0]
                            .children[1]
                            .className
                        }"
                        href="${createrpage}">
                        ${creatername}
                        </a>
                    </div>
                </div>
            </div>
        `
    ;
    parent.appendChild(ilust)

    return ilust;
}

