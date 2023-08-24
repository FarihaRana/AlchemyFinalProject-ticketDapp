import {
  Flex,
  Text,
  Badge,
  Box,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { getUnsoldTickets } from "./FetchTickets";
import { GetContract } from "../Contract";
import EventTicket from "../artifacts/contracts/PaymentToken.sol/EventFaucetToken.json";
export function TicketsSale() {
  const [loading, setLoading] = useState(true);
  const [unsoldTickets, setUnsoldTickets] = useState([]);

  useEffect(() => {
    async function fetchUnsoldTickets() {
      const unsold = await getUnsoldTickets();
      setUnsoldTickets(unsold);
      setLoading(false);
    }
    fetchUnsoldTickets();
  }, []);
 
  function datestring(date) {
    const dateOb = new Date(date * 1000);
    const dateString = dateOb.toDateString();
    return dateString;
  }

  const handlePurchase = async (ticketId, price) => {
    try {
      const { contract, currSigner } = await GetContract();
      const TokenCA = "0x427d3F7321178a5155990038363770f6253fE13B";
      const EventTicketCA = "0x4A9E7e8435287e261fFA146031eC952F10578165";
      const tokenContract = new ethers.Contract(
        TokenCA,
        EventTicket.abi,
        currSigner
      );
      await tokenContract.approve(EventTicketCA, price);
      await contract.purchaseTicket(ticketId, price);
    } catch (error) {
      alert("an error occurred", error.message);
    }
  };

  return (
    <Box justify="space-between" align="center">
      {!loading ? (
        <SimpleGrid columns={4} spacing={108}>
          {unsoldTickets.map((ticket, i) => (
            <Flex
              key={i}
              display={"flex"}
              flexDirection={"column"}
              boxShadow="md"
              borderRadius="md"
            >
              <Box>
                <Heading m={2} size="lg">
                  {ticket.ticketTitle}
                </Heading>
                <Text m={2} size="sm">
                  {" "}
                  <b>About the event:</b> {ticket.eventDetails}
                </Text>
                <Text m={2} size="sm">
                  <b>Price:</b>{" "}
                  {ethers.utils.formatEther(ticket.price, "ether")}
                </Text>
                <Text m={2} size="sm">
                  {" "}
                  <b>TicketId: </b> {parseInt(ticket.ticketID._hex, 16)}
                </Text>
                <Badge m={2} p={1} colorScheme="green">
                  {datestring(ticket.date)}
                </Badge>
              </Box>

              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                mt={4}
                onClick={() => handlePurchase(ticket.ticketID, ticket.price)}
              >
                Buy Now
              </Button>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <Text justify="center" align="center">
          Loading...
        </Text>
      )}
    </Box>
  );
}
