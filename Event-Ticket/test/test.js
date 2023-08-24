const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("EventTicketContract", function () {
    let FaucetToken;
    let faucetToken  
    let EventTicketContract;
    let eventTicketContract;
    let owner;
    let addr1;
    let addr2;

    it("Deploymentof the contract", async function () {
       [owner, addr1, addr2] = await ethers.getSigners();
     
       FaucetToken= await ethers.getContractFactory("EventFaucetToken");
       faucetToken= await FaucetToken.deploy();
        EventTicketContract = await ethers.getContractFactory("EventTicketContract");
        eventTicketContract = await EventTicketContract.deploy(faucetToken);
      console.log(faucetToken.target)
      console.log(owner.address)
      console.log("addr1",  addr1.address)
      console.log("addr2", addr2.address)     
    });
   
   
    it("should create a ticket", async function () {
      const unixDate = new Date("2023-10-08");
     const unixTimestamp = Math.floor(unixDate.getTime() / 1000);
     const ticketQuantity = 10

    const ticketTitles = Array(ticketQuantity).fill("Event");
    const eventDetailsArray = Array(ticketQuantity).fill("Event detail");
    const ticketQuantities = Array(ticketQuantity).fill(1);
    const prices = Array(ticketQuantity).fill(ethers.parseEther(".1"));
    const dates = Array(ticketQuantity).fill(unixTimestamp);
    await eventTicketContract.connect(owner).createTicket(
      ticketTitles,
      eventDetailsArray,
      ticketQuantities,
      prices,
      dates
    ); 
    const minter = await eventTicketContract.ticketSeller(6)
    assert(owner.address === minter, "Not minted" )
    });
  
    it("should allow purchasing a ticket", async function () {
      await faucetToken.connect(addr2).mint(ethers.parseEther("0.1"))
      const BuyerBalancesBefore = await faucetToken.balanceOf(addr2.address)
      console.log("BuyerBalancesBefore", BuyerBalancesBefore)
      await faucetToken.connect(addr2).approve(eventTicketContract, ethers.parseEther("0.1"));
      await eventTicketContract.connect(addr2).purchaseTicket(9, ethers.parseEther(".1"))
  
      const BuyerBalancesAfter = await faucetToken.balanceOf(addr2.address)
      console.log("BuyerBalancesAfter", BuyerBalancesAfter)

      const sellerBalanceAfter = await eventTicketContract.sellerBalances(owner.address);
      console.log("sellerBalanceAfter", sellerBalanceAfter)

      expect(sellerBalanceAfter).to.equal(ethers.parseEther("0.1"));

    });
  
    it("should not allow withdrawing balance before event expiration", async function () {
      await eventTicketContract.connect(owner).withdrawBalance();
    });
    
    it("should allow cancelling tickets", async function () {
      
      await eventTicketContract.connect(addr2).cancelTicket(9);
  
      const BalanceAfterCancelling = await eventTicketContract.sellerBalances(owner.address);
   
      expect(BalanceAfterCancelling).to.equal(ethers.parseEther("0"));
    
    });
  });

   

  
 
  