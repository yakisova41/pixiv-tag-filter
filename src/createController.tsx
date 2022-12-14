import React from 'react';
import ReactDOM from 'react-dom/client';
import Controller from './components/Controller';
import styles from './styles/global.css';

export default ()=>{
    const body = document.querySelector("body");

    const controllerRoot = document.createElement('div');
    controllerRoot.className = styles.pixivFilterControllerRoot;
    body.appendChild(controllerRoot);

    ReactDOM.createRoot(controllerRoot)
    .render(
        <React.StrictMode>
            <Controller/>
        </React.StrictMode>
    );
}