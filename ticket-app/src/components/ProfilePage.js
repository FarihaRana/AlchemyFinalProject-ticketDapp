import {SimpleGrid,Flex, Heading, Box, Button, Tab, Tabs, TabList, TabPanels, TabPanel, Text , Badge} from '@chakra-ui/react';
import { DisplayOwnerTickets } from './FetchTickets';
import { ethers } from 'ethers';
import { useState } from 'react';
import { GetContract } from '../Contract';
export function ProfilePage() {
  const[loading, setLoading] = useState(true)
  const[Mintedtickets, setMintedtickets] = useState([])
  const[boughtTickets, setBoughtTickets] = useState([])
  const[isFetched, setIsFetched] = useState(false)
    async function fetchTickets(){
     setLoading(false)
        const {sellerTickets, buyerTickets} = await DisplayOwnerTickets();
        setMintedtickets(sellerTickets);
        setBoughtTickets(buyerTickets)
        setIsFetched(true)
    }

    const handleReturn = async (ticketId) => {
      try{
        const {contract} = await GetContract();
        await  contract.cancelTicket(ticketId);
    }catch(error){
      alert("This error occurred", error);
    };
    };

    function datestring(date){
      const dateOb = new Date(date * 1000)
      const dateString = dateOb.toDateString() 
      return dateString
    }

  return (
    <Box h="100vw" p={8}>
  <Flex justify="center" align="center" >
      <Tabs  isFitted margin={15}>
    <TabList>
    <Tab >
      Minted Tickets
    </Tab>
    <Tab>
      Purchased Tickets
    </Tab>
    </TabList>
    { !loading ? (
      <TabPanels>
  <TabPanel>
    {isFetched ? (
      Mintedtickets.length > 0 ? (
        <SimpleGrid w="46vw" columns={3} spacing={6}>
          {Mintedtickets.map((ticket, index) => (
            <Flex
              key={index}
              flexDir="column"
              color="black"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
              boxShadow="0 4px 8px rgba(0, 0, 0, .8)"
            >
            <Box>
            <Heading  m={2}  size="lg">{ticket.ticketTitle}</Heading>
              <Text  m={2}  size="sm"> <b>About the event:</b> {ticket.eventDetails}</Text>
              <Text  m={2}  size="sm"> <b>TicketId</b> {parseInt(ticket.ticketID._hex, 16)}</Text>
              <Text  m={2}  size="sm">
               <b>Price:</b> {ethers.utils.formatEther(ticket.price, "ether")}
              </Text>
              <Badge m={2} p={1} colorScheme="green">{datestring(ticket.date)}</Badge>
              <Badge colorScheme="yellow">
                {ticket.SoldOut ? "Sold Out" : "Not yet Sold"}
              </Badge>
            </Box>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Nothing Found</Text>
      )
    ) : (
      <Text>Connecting to fetch tickets...</Text>
    )}
  </TabPanel>
  <TabPanel>
    {isFetched ? (
      boughtTickets.length > 0 ? (
        <SimpleGrid w="46vw" columns={3} spacing={6}>
          {boughtTickets.map((ticket, index) => (
            <Flex
              key={index}
              flexDir="column"
              color="black"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
              boxShadow="0 4px 8px rgba(0, 0, 0, .8)"
            >
            <Box>
            <Heading  m={2}  size="lg">{ticket.ticketTitle}</Heading>
              <Text  m={2}  size="sm"> <b>About the event:</b> {ticket.eventDetails}</Text>
              <Text  m={2}  size="sm"> <b>TicketId</b> {parseInt(ticket.ticketID._hex, 16)}</Text>
              <Text  m={2}  size="sm">
               <b>Price:</b> {ethers.utils.formatEther(ticket.price, "ether")}
              </Text>
              <Badge m={2} p={1} colorScheme="green">{datestring(ticket.date)}</Badge>
            </Box>
             
              <Button
          type="submit"
          colorScheme="teal"
          size="md"
          mb={4}
          onClick={() => handleReturn(ticket.ticketID)}
        >Return</Button>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Nothing Found</Text>
      )
    ) : (
      <Text>Connecting to fetch tickets...</Text>
    )}
  </TabPanel>
</TabPanels>
      ) : (
     <Button margin={15} onClick={fetchTickets}>Connect to metaMask</Button>
     )}
  </Tabs>
    </Flex> 
    </Box>
  );
}

          
             