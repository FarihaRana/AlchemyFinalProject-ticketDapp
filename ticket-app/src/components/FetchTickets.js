import { GetContract } from '../Contract';
const {contract, currSigner} = await GetContract();
export async function DisplayOwnerTickets() {
  let sellerTickets =[];
  let buyerTickets = [];
    try{
      const message = 'I am signing this message to connect.';
      await currSigner.signMessage(message);
      const address = await currSigner.getAddress();
      const TicketsArray = await contract.getNftsDetails();
      for(let i = 0; i < TicketsArray.length; i++){
      let indexedArray = TicketsArray[i]
      let sellerAdd =  await contract.ticketSeller(indexedArray.ticketID);
       await contract.ticketBuyer(indexedArray.ticketID);
        if(sellerAdd === address){
          sellerTickets.push(indexedArray)
        }
        else{ 
          if(indexedArray.soldOut)
          buyerTickets.push(indexedArray)
        }
      }
      
  }catch(error){
    alert("This error occurred", error.message);
  }
  return {sellerTickets, buyerTickets};
}

export async function getUnsoldTickets(){
  let unsoldTicketArray = []
  try {
    const TicketArray = await  contract.ticketsForSale()
    unsoldTicketArray = TicketArray.filter((nft) => !nft.soldOut);
    } catch (error) {
      console.error('Error creating tickets:', error.message);
    }
    return unsoldTicketArray
}
