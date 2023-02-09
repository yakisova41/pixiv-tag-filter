/**
 * originalのulを非表示にするcssを挿入
 */
export default () => {
    const overRideStyle = document.createElement("style");
    overRideStyle.innerHTML = `
    #root > .charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section > div:nth-child(2) > ul{
        display: none !important;
    }

    #root > .charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section > div:nth-child(2) > ul{
        display: none !important;
    }
    `;
    document.querySelector("head").appendChild(overRideStyle);
};
