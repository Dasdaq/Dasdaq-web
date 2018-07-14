import React from "react"
const MetaMaskDownloadURL = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
export default function Footer() {
    return (<footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Market</strong> 
        <br />
        Made with ❤️ by <a href="https://frankwei.xyz">Frank Wei</a>.
        <br />
        从 Google Chrome 应用商店下载 
        <a href={MetaMaskDownloadURL}> MetaMask</a>, 一个开源且安全的以太坊钱包
      </p>
    </div>
  </footer>)
}