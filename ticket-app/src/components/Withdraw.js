import React, {useState} from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { GetContract } from '../Contract';
import { ethers } from 'ethers';
const {contract, currSigner} = await GetContract();
function WithdrawBalance() {
  const [balance, setBalance] = useState(0);
  const [loading, setloading] = useState(true);
 

  async function getBalance(){
   try{
    const message = 'I am signing this message to connect.';
    await currSigner.signMessage(message);
    const add = currSigner.getAddress()
    const balances = await contract.sellerBalances(add); 
    const hexBalance =  parseInt(balances._hex, 16)
    const formatBalance = ethers.utils.formatEther(hexBalance.toString())
    setBalance(formatBalance)
    setloading(false)
    console.log(balances);
   }
   catch(error){
    alert(error.message)
   }
  }
   
  const handleWithdraw = async () => {
      const response = await contract.withdrawBalance();
      console.log(response );
  };
  
  return (
    <Box align="center" justify='center'>
    {!loading ? (
      <Box  mt={20} w={"20vw"} borderWidth="1px" p={4} bgColor="gray.100" borderRadius="md">
        <Text fontSize="lg" mb={2}>Available Balance to Withdraw : {balance}</Text>
        <Button mt={4} colorScheme="teal" onClick={handleWithdraw}>Withdraw</Button>
      </Box>
     ) : <Button mt={"2rem"} onClick={getBalance}>Connect to metaMask</Button>
    }
    </Box>
  );
}

export default WithdrawBalance;
 