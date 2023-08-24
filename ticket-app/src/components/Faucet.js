import { Button,Box, VStack, FormControl, Heading, Input, Spinner, Text} from "@chakra-ui/react";
import { useState } from "react";
import EventTicket from '../artifacts/contracts/PaymentToken.sol/EventFaucetToken.json';
import {ethers} from "ethers";
import { Connect } from '../Metamask';

export function Faucet(){
    const [isMinting, setIsMinting] = useState(false);
    const [tokenValue, setTokenValue] = useState(0);
    const [balance, setBalance] = useState(0);
    const {connectAccount, signer} = Connect();
        let currSigner

async function mintFaucet(e){
         e.preventDefault();
            if(!signer){
                currSigner = await connectAccount()
             }
             else{
               currSigner = signer
             }
             const TokenCA = "0x427d3F7321178a5155990038363770f6253fE13B";
             const  tokenContract = new ethers.Contract(TokenCA, EventTicket.abi, currSigner); 
             const tokenValueString = tokenValue.toString() 
             setIsMinting(true) 
             const address = currSigner.getAddress()
             const mintResponse = await  tokenContract.mint(ethers.utils.parseEther(tokenValueString));
             console.log('mintResponse', mintResponse)   
             const balances = await  tokenContract.balanceOf(address);
             const hexBalance =  parseInt(balances._hex, 16)
             const formatBalance = ethers.utils.formatEther(hexBalance.toString())
             console.log( formatBalance)
             setBalance(formatBalance)   
             setIsMinting(false) 
        }
   return (
    <Box mt={10}>
    <VStack flexDirection="column" alignItems="center" p={8}>
      <Box bgColor="gray.100" p={8} borderRadius="md">
        <Heading mb={6} fontSize={"1.3rem"}>
          Get Faucet Token
        </Heading>
        <FormControl>
          <VStack spacing={4} alignItems="center">
          <Text><b>Balance after minting</b> : {balance}</Text>
            <Input
              value={tokenValue}
              w="100px"
              onChange={(e) => setTokenValue(e.target.value)}
              size="md"
              borderColor="teal.500"
              _focus={{ borderColor: "teal.300" }}
            />
            <Button
              type="submit"
              isLoading={isMinting}
              colorScheme="teal"
              size="lg"
              w="100px"
              onClick={mintFaucet}
            >
              {!isMinting ?  "Mint" : <Spinner size="sm" />}
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </VStack>
  </Box>  
   )}  