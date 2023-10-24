import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react'
import { FaHome, FaHeart, FaUserAlt } from 'react-icons/fa'
import { RiUserSearchFill } from 'react-icons/ri'

export default function Navbar() {
    return (
        <Box p="4">
            <Heading color="green">
                Circle
            </Heading>

            <HStack mt="5" color="white">
                <FaHome size={24}/>
                <Text>
                    Home
                </Text>
            </HStack>

            <HStack mt="5" color="white">
                <RiUserSearchFill size={24}/>
                <Text>
                    Search
                </Text>
            </HStack>

            <HStack mt="5" color="white">
                <FaHeart size={24}/>
                <Text>
                    Follows
                </Text>
            </HStack>

            <HStack mt="5" color="white">
                <FaUserAlt size={24}/>
                <Text>
                    Profile
                </Text>
            </HStack>

            <Button colorScheme='green' size="sm" w="full" rounded="full" mt="3 ">
                Create Post
            </Button>
        </Box>
    )
}
