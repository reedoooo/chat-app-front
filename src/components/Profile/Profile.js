import React from 'react';
import { Box, Flex, Image, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { AiOutlineEdit } from 'react-icons/ai';
import defaultImage from '../../assets/defaultImage.jpeg'; // Your placeholder image

const Profile = () => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle the save changes logic here...
  };

  return (
    <Box p={5}>
      <Flex justify="center">
        <Image
          borderRadius="full"
          boxSize="300px"
          src={defaultImage}
          alt="Profile picture"
        />
      </Flex>

      <Flex justify="center" my={3}>
        <Button leftIcon={<AiOutlineEdit />}>Edit</Button>
      </Flex>

      <FormControl id="name" mb={3}>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id="age" mb={3}>
        <FormLabel>Age</FormLabel>
        <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </FormControl>

      <FormControl id="status" mb={3}>
        <FormLabel>Relationship Status</FormLabel>
        <Input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      </FormControl>

      <Button onClick={handleSaveChanges} colorScheme="blue">
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;
