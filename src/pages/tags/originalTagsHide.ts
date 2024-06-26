/**
 * originalのulを非表示にするcssを挿入
 */
export default function originalTagsHide() {
  const overRideStyle = document.createElement("style");
  overRideStyle.innerHTML = `
    #root > div.charcoal-token > div > div:nth-child(3) > div > div > div:nth-child(6)  > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul {
        display: none !important;
    }

    #root > div.charcoal-token > div > div:nth-child(3) > div > div > div:nth-child(5)  > section:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul {
        display: none !important;
    }

    #root > div:nth-child(2) > div > div:nth-child(4) > div > div > div:nth-child(6) > section > div:nth-child(2) > div:nth-child(1) > ul {
      display: none !important;
    }
    `;
  document.querySelector("head").appendChild(overRideStyle);
}
