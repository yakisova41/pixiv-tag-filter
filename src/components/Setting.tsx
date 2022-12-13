import React from 'react';
import styles from '../styles/controller.css';

export const Setting = ({
    text,
    children
}: {
    text:string,
    children:React.ReactNode
})=>{
    return(
        <li className={styles.setting}>
            <span className={styles.settingText}>{text}</span>
            {children}         
        </li>
    )
}