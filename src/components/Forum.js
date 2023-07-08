import {
  Box,
  Image,
  Text,
  Stack,
  Avatar,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';

const posts = [
  {
    id: 1,
    username: 'User1',
    avatar: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/500',
    caption: 'This is a test caption for the post by User1',
  },
  {
    id: 2,
    username: 'User2',
    avatar: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/500',
    caption: 'This is a test caption for the post by User2',
  },
  // Add more posts as necessary
];

const Forum = () => {
  return (
    <VStack spacing={8} align="stretch">
      {posts.map((post) => (
        <Box key={post.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Stack direction="row" align="center">
              <Avatar name={post.username} src={post.avatar} />
              <Text fontWeight="bold">{post.username}</Text>
            </Stack>
            <Image my={4} boxSize="100%" objectFit="cover" src={post.image} alt={post.caption} />
            <Text>{post.caption}</Text>
            <Input mt={4} placeholder="Add a comment..." />
          </Box>
        </Box>
      ))}
      <Button colorScheme="teal" size="md">
        Load More
      </Button>
    </VStack>
  );
};

export default Forum;
