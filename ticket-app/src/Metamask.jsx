import { ethers } from 'ethers';
export function Connect() {
let signer;
  async function connectAccount(){
       let provider;
    if (window.ethereum == null) {
        alert("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        return signer;
      }
  }
  return {connectAccount, signer};
}



