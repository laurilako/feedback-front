import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
})

const styles = {
  global: props => ({
    body: {
      color: mode('black', '#FCFFFD')(props),
      bg: mode('#EEEEEE', '#06082a')(props),
    },
  }),
};
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};


const theme = extendTheme({
    styles,
    config
});

export default theme;