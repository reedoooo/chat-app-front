import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.100',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'blue.500',
          color: 'white',
          _hover: {
            bg: 'blue.600',
          },
          _active: {
            bg: 'blue.700',
          },
        },
        outline: {
          borderColor: 'blue.500',
          color: 'blue.500',
          _hover: {
            bg: 'blue.500',
            color: 'white',
          },
          _active: {
            bg: 'blue.700',
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
