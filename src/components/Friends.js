import { useSelector } from 'react-redux';
import { Box, Avatar, Text, Button, VStack, Stack, Heading } from '@chakra-ui/react';

const Friends = () => {
  const friends = useSelector((state) => state.friends);

  return (
    <VStack spacing={4} align="stretch" p={5}>
      <Heading as="h2" size="lg">Friends</Heading>
      {friends && friends.map((friend) => (
        <Stack direction="row" align="center" spacing={4} key={friend.id} boxShadow="md" p="4" borderRadius="md">
          <Avatar name={friend.name} src={friend.avatar} />
          <Box flex="1">
            <Text fontSize="lg">{friend.name}</Text>
          </Box>
          <Button colorScheme="blue">Chat</Button>
        </Stack>
      ))}
    </VStack>
  );
};

export default Friends;
