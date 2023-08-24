async function main() {
  const [owner] = await ethers.getSigners();
  const tokenC = "EventFaucetToken";
  const Tca = "0x913Bc0243f598B748a591aB87A881CCc75A1FceC";
    let Tartifacts = await hre.artifacts.readArtifact(tokenC);
    let Tcontract = new ethers.Contract(Tca, Tartifacts.abi, owner);
    
    const contractName = "EventTicketContract";
    const Eca = "0x4A9E7e8435287e261fFA146031eC952F10578165";
    let artifacts = await hre.artifacts.readArtifact(contractName);
    let contract = new ethers.Contract(Eca, artifacts.abi, owner);
  
  try{
    await  Tcontract.mint(ethers.parseEther("1"));
    await Tcontract.approve(contract,ethers.parseEther(".1") ) 
    const response1 = await contract.ticketSeller(1); 
    console.log(response1);
    const response2 = await  contract.purchaseTicket(2, ethers.parseEther(".1"));
    console.log(response2);
    const response3 = await contract.ticketBuyer(2); 
    console.log(response3);
    const response4 = await contract.ownedNfts(owner, 1); 
    console.log(response4);
  }catch(error){
    console.error(error)
  }
}
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  