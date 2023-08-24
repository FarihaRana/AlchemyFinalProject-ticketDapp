import  { useState } from "react";
import {  Button, FormControl, FormLabel, Input, VStack, Center } from '@chakra-ui/react';
import {Mint} from './MintTicket';
export const TicketForm = () => {
  const [ticketTitle, setTicketTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketTitleValue = ticketTitle;
    const eventDetailsValue = eventDetails;
    const ticketQuantityValue = ticketQuantity;
    const priceValue = price;
    const dateValue = date;
  
    try {
      await Mint({
        ticketTitle: ticketTitleValue,
        eventDetails: eventDetailsValue,
        ticketQuantity: ticketQuantityValue,
        price: priceValue,
        date: dateValue,
      });
    } catch (error) {
      console.error("Error creating tickets:", error.message);
    }
  };
  
  return (
    <Center>
    <VStack mt={8} w="100%" maxW="500px" spacing={4} align="stretch" borderWidth="1px" p={4} bgColor="gray.100" borderRadius="md">
      <FormControl>
        <FormLabel>Ticket Title</FormLabel>
        <Input
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)}
          placeholder="Enter Ticket Title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event Details</FormLabel>
        <Input
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
          placeholder="Enter Event Details"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Ticket Quantity</FormLabel>
        <Input
          type="number"
          value={ticketQuantity}
          onChange={(e) => setTicketQuantity(e.target.value)}
          placeholder="Enter Ticket Quantity"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
        Mint 
      </Button>
    </VStack>
  </Center>
  
  );
};

