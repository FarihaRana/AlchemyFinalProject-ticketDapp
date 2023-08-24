async function main() {
    const [owner] = await ethers.getSigners();
      console.log(owner.address)
      const contractName = "EventTicketContract";
      const Eca = "0x4A9E7e8435287e261fFA146031eC952F10578165";
      let artifacts = await hre.artifacts.readArtifact(contractName);
      let contract = new ethers.Contract(Eca, artifacts.abi, owner);
      
    try{
      const response1 = await contract.sellerBalances(owner); 
      console.log(response1);
      const response2 = await contract.withdrawBalance();
      console.log(response2);
      const response3 = await contract.sellerBalances(owner); 
      console.log(response3);
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
    