async function main() {
    const [owner] = await ethers.getSigners();
      
      const contractName = "EventTicketContract";
      const Eca = "0x4A9E7e8435287e261fFA146031eC952F10578165";
      let artifacts = await hre.artifacts.readArtifact(contractName);
      let contract = new ethers.Contract(Eca, artifacts.abi, owner);
      
    try{
      const response1 = await contract.previousOwners(2, 0); 
      console.log(response1);
      const response3 = await contract.cancelTicket(2); 
      console.log(response3);
      const response5 = await contract.previousOwners(2, 0); 
      console.log(response5);
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
    