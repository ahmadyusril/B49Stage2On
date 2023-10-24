import { Box, Button, Grid, GridItem, HStack, Input, Text } from '@chakra-ui/react'
import Navbar from './components/Navbar';
import ThreadCard from './features/threads/component/ThreadCard';
import { Avatar } from '@chakra-ui/react'
import { LuImagePlus } from 'react-icons/lu'

// Card tengah
export function App() {
  return (
    <>
      <Grid gridTemplateColumns= "300px 1.2fr 1fr" bg="blackAlpha.900" minH="100vh">
        <GridItem borderRight="1px solid gray"><Navbar /></GridItem>
        <GridItem borderRight="1px solid gray" p="4">
          <Text color="white" fontWeight="semibold">
            Home
          </Text>

          <HStack mt="5">
            <Avatar size="sm" />
            <Input placeholder='What is happening?' variant='unstyled'/>
            <LuImagePlus color="green" size={20} />
            <Button size="ss" color="whiteAlpha.800" colorScheme='green' rounded="full" px="4" py="1">
              Post
            </Button>
          </HStack>
          <Box mt="5">
            <ThreadCard />
          </Box>
        </GridItem>
        <GridItem ></GridItem>
      </Grid>
    </>
  );
}