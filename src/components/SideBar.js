import { Box, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SideBar = ({ isOpen, onClose }) => {
  return (
    <Box
      display={isOpen ? 'block' : 'none'}
      position='fixed'
      top={0}
      left={0}
      bottom={0}
      w='200px'
      bg='gray.800'
      color='white'
      p={5}
      zIndex='modal' // to ensure it overlays other components
    >
      <Button
        as={RouterLink}
        to='/settings'
        onClick={onClose}
        w='100%'
        mb={2}
        colorScheme='teal'
      >
        Settings
      </Button>
      <Button
        as={RouterLink}
        to='/friends'
        onClick={onClose}
        w='100%'
        mb={2}
        colorScheme='blue'
      >
        Friends
      </Button>
      <Button
        as={RouterLink}
        to='/profile'
        onClick={onClose}
        w='100%'
        mb={2}
        colorScheme='purple'
      >
        Profile
      </Button>
      <Button
        as={RouterLink}
        to='/forum'
        onClick={onClose}
        w='100%'
        mb={2}
        colorScheme='pink'
      >
        Forum
      </Button>
    </Box>
  );
};

export default SideBar;
