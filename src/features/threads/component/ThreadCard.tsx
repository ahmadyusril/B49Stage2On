import { Avatar, Box, Flex, HStack } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import { LuDot } from 'react-icons/lu'

interface ThreadCard {
    author_picture: string,
    author_full_name: string,
    author_username: string,
    posted_at: string,
    content: string,
    image: string,
    likes_count: number,
    replies_count: number
}


export default function ThreadCard() {
    return (
        <Flex gap={3} borderBottom="1px solid gray">
           <Box>
            <HStack>
            <Avatar size="sm" />
            <Text display="flex" color="white" fontSize="xs" gap="1" align="center">
                Indah Prakarya <Text display="flex" alignContent="center" color="whiteAlpha.600">@indahpra <LuDot size={15}/>4h</Text>
            </Text>

            </HStack>
            <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Nobis accusamus fugiat alias itaque. Eaque, doloribus ducimus sint maxime vel debitis sequi, 
                voluptates optio eos, itaque laudantium eius ipsa voluptatem omnis!
            </Text>
           </Box>
        </Flex>
    )
}
{/* <ThreadCard
        author_picture="authorpicture.png"
        author_full_name="George Floyd"
        author_username="georgefloyd69"
        posted_at="3m"
        content="Pernah gak sih lu susah nafas"
        likes_count={69}
        replies_count={420}
        image="image.jpg"
      />

      <ThreadCard
        author_picture="authorpicture.png"
        author_full_name="Nurhadi Aldo"
        author_username="nurhadialdo81"
        posted_at="5h"
        content="OTW nyapres coy"
        likes_count={1000}
        replies_count={5000}
        image="image.jpg"
      />

      <ThreadCard
        author_picture="authorpicture.png"
        author_full_name="Furina"
        author_username="furinaaaaa"
        posted_at="7h"
        content="Besok sidang lagi"
        likes_count={200}
        replies_count={42}
        image="image.jpg"
      /> */}