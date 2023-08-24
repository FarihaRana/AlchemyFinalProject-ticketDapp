// add the game address here and update the contract name if necessary
async function main() {
  const cA = "0x4A9E7e8435287e261fFA146031eC952F10578165";
const [owner] = await ethers.getSigners();
const contractName = "EventTicketContract";
  let artifacts = await hre.artifacts.readArtifact(contractName);
  let contract = new ethers.Contract(cA, artifacts.abi, owner);
  
  const unixDate = new Date("2023-10-08");
  const unixTimestamp = Math.floor(unixDate.getTime() / 1000);
  const ticketQuantity = 10

  try {
    const ticketTitles = Array(ticketQuantity).fill("Event ");
    console.log(ticketTitles);
    const eventDetailsArray = Array(ticketQuantity).fill("Event detail");
    console.log(eventDetailsArray);
    const ticketQuantities = Array(ticketQuantity).fill(1);
    console.log(ticketQuantities);
    const prices = Array(ticketQuantity).fill(ethers.parseEther(".1"));
    console.log(prices);
    const dates = Array(ticketQuantity).fill(unixTimestamp);
    console.log(dates);
    const response = await contract.createTicket(
      ticketTitles,
      eventDetailsArray,
      ticketQuantities,
      prices,
      dates
    );
      console.log(response)
      const response2 = await  contract.ticketSeller(0)
      console.log(response2);
  } catch (error) {
    console.error('Error creating tickets:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
