async function main() {
  faucetTokenAddress = "0x427d3F7321178a5155990038363770f6253fE13B"
  const [owner] = await ethers.getSigners();
    console.log(owner.address)
    
    const EventContarct= await ethers.getContractFactory("EventTicketContract");
    const eventContarct= await EventContarct.deploy(faucetTokenAddress);
     console.log(eventContarct)
     console.log( "eventContarct deployed to address:",  eventContarct.target);
    //  0x66a8326Cea3E5fa2910CBd8b6FAf523945248B64
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });