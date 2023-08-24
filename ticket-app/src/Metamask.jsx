import { ethers } from 'ethers';
export function Connect() {
let signer;
  async function connectAccount(){
       let provider;
    if (window.ethereum == null) {
        alert("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
         const network = await provider.getNetwork();
        const requiredNetworkId = 8081; 

          if (network.chainId !== requiredNetworkId) {
            alert(`Please connect to the required network (${requiredNetworkId})`);
            return null;
          }
        signer = await provider.getSigner();
        return signer;
      }
  }
  return {connectAccount, signer};
}



