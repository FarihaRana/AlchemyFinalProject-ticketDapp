import {Flex,Box} from '@chakra-ui/react';
import { TicketsSale } from './TicketsSale';
export function HomePage() {

  return (
    <Box mt={20}>
      <Flex align="center" justify="center">
      {<TicketsSale/>}
          </Flex>
    </Box>
  );
}
