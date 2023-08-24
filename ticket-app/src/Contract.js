import EventTicket from './artifacts/contracts/EventTicket.sol/EventTicketContract.json';
import { ethers } from 'ethers';
import {Connect } from './Metamask';
export async function GetContract(){
    const {
      connectAccount, signer
      } = Connect();
      let currSigner
      if(!signer){
         currSigner = await connectAccount()
      }
      else{
        currSigner = signer
      }
       const contractAddress = '0x4A9E7e8435287e261fFA146031eC952F10578165'; 
       const  contract = new ethers.Contract(contractAddress, EventTicket.abi, currSigner); 
      return {contract, currSigner};
}