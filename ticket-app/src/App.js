import {ChakraProvider, Heading, Flex, Box} from '@chakra-ui/react';
import {BrowserRouter as Router,Routes, Route, NavLink} from 'react-router-dom';
import './App.css';
import {TicketForm} from './components/Form';
import {ProfilePage} from './components/ProfilePage'; 
import { HomePage } from './components/HomePage';
import { Faucet } from './components/Faucet';
import WithdrawBalance from './components/Withdraw';
function App() {
    return (
    <Router>
       <ChakraProvider>
       <Box  maxW="100vw" mx="auto" >
      <Flex p={4} align="center" justify="space-between" fontSize="1.5rem" fontWeight={"bolder"} borderBottom="1px solid #e2e8f0" mt={-4} >
            <NavLink to="/">
            Buy Tickets
            </NavLink>
            <NavLink to="/Faucet" >
            Get Faucet
            </NavLink>
            <NavLink to="/Form" >
             Mint Tickets
            </NavLink>
            <NavLink to="/withdraw">
             Withdraw Funds
            </NavLink>
            <NavLink to="/ProfilePage">
             Visit Profile
            </NavLink>
      </Flex>
      </Box>
      <Flex display="flex" alignItems="center" w="80vw" mt={2} p={2}  textShadow="1px 1px #ffff11" align="center" justify="center" fontSize={34}>
      <Heading fontSize="6s" mt={10} textShadow="2px 1px #cccc66" >
              Decentralized Event Tickets Marketplace 🖼
      </Heading>
      </Flex>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Faucet" element={<Faucet/>} />
        <Route path="/Form" element={<TicketForm/>} />
        <Route path="/withdraw" element={<WithdrawBalance/>} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
      </Routes>
    </ChakraProvider>
  </Router>
  );
}
export default App;
