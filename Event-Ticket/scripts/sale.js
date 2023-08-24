// add the game address here and update the contract name if necessary
async function main() {
  const cA = "0x4A9E7e8435287e261fFA146031eC952F10578165";
  const [owner] = await ethers.getSigners();
  const contractName = "EventTicketContract";
    let artifacts = await hre.artifacts.readArtifact(contractName);
    let contract = new ethers.Contract(cA, artifacts.abi, owner);
      
    try {
    const response = await  contract.ticketsForSale()
     console.log(response);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  