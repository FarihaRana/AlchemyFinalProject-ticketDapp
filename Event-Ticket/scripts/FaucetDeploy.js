const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  const [owner] = await ethers.getSigners();
  console.log(owner.address)
  
  const FaucetToken= await hre.ethers.getContractFactory("EventFaucetToken");
  const faucetToken= await FaucetToken.deploy();
   console.log(faucetToken)
   console.log(`${faucetToken} deployed to address: ${faucetToken.target}`);
  //  0x427d3F7321178a5155990038363770f6253fE13B
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });