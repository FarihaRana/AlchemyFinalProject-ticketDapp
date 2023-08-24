import { ethers } from 'ethers';
import { GetContract } from '../Contract';
import('react-dom');
window.React2 = import('react');
console.log(window.React1 === window.React2);
export async function Mint({ticketTitle, eventDetails, ticketQuantity, price, date}){
const {contract} = await GetContract();
const unixDate = new Date(date);
const unixTimestamp = Math.floor(unixDate.getTime() / 1000);
const priceString = price.toString();
const parsePrice = ethers.utils.parseEther(priceString);
console.log(parsePrice); 
  try {
    const ticketTitles = Array.from({ length: ticketQuantity }, () => ticketTitle);
    const eventDetailsArray = Array.from({ length: ticketQuantity }, () => eventDetails);
    console.log(eventDetailsArray);
    const ticketQuantities = Array.from({ length: ticketQuantity }, () => 1);
    console.log(ticketQuantities);
    const prices = Array.from({ length: ticketQuantity }, () => parsePrice);
    console.log(prices);
    const dates = Array.from({ length: ticketQuantity }, () => unixTimestamp);
    console.log(dates);    
    const response = await contract.createTicket(
      ticketTitles,
      eventDetailsArray,
      ticketQuantities,
      prices,
      dates
    );
    console.log(response)
    await contract.getNftsDetails();
  } catch (error) {
    console.error('Error creating tickets:', error);
  }
}
