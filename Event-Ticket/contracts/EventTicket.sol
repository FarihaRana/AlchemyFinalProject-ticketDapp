// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IFaucetToken {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address sender, address recipient) external returns (uint256); 
}

contract EventTicketContract is ERC1155, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public tokenAddress;

    event TicketsBatchCreated(address indexed creator, uint256[] tokenIds);
    event TicketPurchased(address indexed buyer, uint256 ticketId);
    event BalanceWithdrawn(address indexed seller, uint256 amount);

    struct Ticket {
        string ticketTitle;
        string eventDetails;
        uint256 price;
        uint256 date;
        uint256 ticketID;
        bool soldOut;
    }
   
    mapping(uint256 => Ticket) private tickets;
    mapping(uint => address) public ticketSeller;
    mapping(uint => address) public ticketBuyer;
    mapping(address => uint256) public sellerBalances;
    mapping(uint256 => address[]) public previousOwners;
    mapping(address => uint256[]) public ownedNfts;
    mapping(address => uint256) private expirationTime;

    constructor(address _tokenAddress) ERC1155("EventTicket" "ETNFT") {
        tokenAddress = _tokenAddress;
    }

    function createTicket(
        string[] memory _ticketTitles,
        string[] memory _eventDetails,
        uint256[] memory _ticketQuantities,
        uint256[] memory _prices,
        uint256[] memory _dates
    ) external {
        for (uint256 i = 0; i < _ticketQuantities.length; i++) {
            require(_ticketQuantities[i] > 0, "Ticket quantity must be greater than 0");
            uint256 _uniqueTokenId = _tokenIds.current();

            tickets[_uniqueTokenId] = Ticket(
                _ticketTitles[i],
                _eventDetails[i],
                _prices[i],
                _dates[i],
                _uniqueTokenId,
                false
            );
            _mint(msg.sender, _uniqueTokenId, _ticketQuantities[i], "");
            ticketSeller[_uniqueTokenId] = msg.sender;
            ownedNfts[msg.sender].push(_uniqueTokenId);
            expirationTime[msg.sender] =  _dates[i];
            _tokenIds.increment();  
        }
    }

    function removeFromOwnedNfts(address owner, uint256 tokenId) private {
        uint256[] storage nftsOwned = ownedNfts[owner];
        for (uint256 i = 0; i < nftsOwned.length; i++) {
            if (nftsOwned[i] == tokenId) {
                nftsOwned[i] = nftsOwned[nftsOwned.length - 1];
                nftsOwned.pop();
                break;
            }
        }
    }
    
    function purchaseTicket(uint256 _ticketId, uint _amount) external payable nonReentrant {
        address seller = ticketSeller[_ticketId];
        Ticket storage ticket = tickets[_ticketId];
        IFaucetToken token = IFaucetToken(tokenAddress);
        require(block.timestamp < ticket.date, "Event has already expired"); 
        require(_amount >= ticket.price, "Insufficient funds");
        require(token.balanceOf(msg.sender) >= ticket.price, "Insufficient tokens to spend");
        require(token.allowance(msg.sender, address(this)) >= ticket.price, "Approve contract to spend tokens");     
        token.transferFrom(msg.sender, address(this), ticket.price);
        _safeTransferFrom(seller, msg.sender, _ticketId, 1, "");       
        ticket.soldOut = true; 
        sellerBalances[seller] += ticket.price;
        previousOwners[_ticketId].push(seller); 
        ticketBuyer[_ticketId] = msg.sender;
        ownedNfts[msg.sender].push(_ticketId);
        removeFromOwnedNfts(seller, _ticketId);
        if (_amount > ticket.price) {
            payable(msg.sender).transfer(_amount - ticket.price);
        }  
        emit TicketPurchased(msg.sender, _ticketId);  
    }
    
    function withdrawBalance() external{
        uint time = expirationTime[msg.sender];
        require(time < block.timestamp, "can't withdraw before event expirartion");
        uint256 balance = sellerBalances[msg.sender];
        require(balance > 0, "No balance to withdraw");
        sellerBalances[msg.sender] = 0; 
        IFaucetToken token = IFaucetToken(tokenAddress);
        require(token.transfer(msg.sender, balance), "Token transfer failed");
        emit BalanceWithdrawn(msg.sender, balance);
    }

    function cancelTicket(uint256 _ticketId) external onlyTicketOwner(_ticketId) {
        Ticket storage ticket = tickets[_ticketId];
        require(block.timestamp < ticket.date, "Event has already expired"); 
        IFaucetToken token = IFaucetToken(tokenAddress);
        address[] storage _previousOwners = previousOwners[_ticketId];
        address prevOwner = _previousOwners[_previousOwners.length - 1];
        _safeTransferFrom(msg.sender, prevOwner, _ticketId, 1, "");
        token.approve(address(this), ticket.price);
        token.transferFrom(address(this), msg.sender, ticket.price);
        for (uint256 i = _previousOwners.length - 1; i > 0; i--) {
            _previousOwners[i] = _previousOwners[i - 1];
        }        
        _previousOwners.pop();
        ticket.soldOut = false; 
        ownedNfts[prevOwner].push(_ticketId);
        sellerBalances[prevOwner] -= ticket.price;
    }

    function getNftsDetails() public view returns (Ticket[] memory) {
        uint256[] storage userNFTs = ownedNfts[msg.sender];
        Ticket[] memory userTickets = new Ticket[](userNFTs.length);
        for (uint256 i = 0; i < userNFTs.length; i++) {
            uint256 _ticketId = userNFTs[i];
            Ticket storage ticket = tickets[_ticketId];
            userTickets[i] = ticket;
        }
        return userTickets;
    }

    function ticketsForSale() public view returns (Ticket[] memory){
        Ticket[] memory TicketsForSale = new Ticket[](_tokenIds.current());
        for(uint i = 0; i < _tokenIds.current(); i++){
           Ticket storage ticket = tickets[i];
           TicketsForSale[i] = ticket;
        }
      return TicketsForSale;
    }
       
    modifier onlyTicketOwner(uint256 _ticketId) {
        require(ticketBuyer[_ticketId] == msg.sender, "Only ticket owner can perform this action");
        _;
    }
}
