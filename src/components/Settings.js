import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useColorMode,
  Divider,
  useToast,
} from '@chakra-ui/react';

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleSave = () => {
    // Save settings here
    toast({
      title: 'Settings Saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Settings</Heading>

      <VStack spacing={5} align="stretch">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Enable Dark Mode</FormLabel>
          <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Enable Notifications</FormLabel>
          <Switch defaultChecked={true} />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Show Online Status</FormLabel>
          <Switch defaultChecked={true} />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Allow Friend Requests</FormLabel>
          <Switch defaultChecked={true} />
        </FormControl>

        <Divider />

        <Button colorScheme="teal" onClick={handleSave}>Save Changes</Button>
      </VStack>
    </Box>
  );
};

export default Settings;
