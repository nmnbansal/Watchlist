// src/components/Layout.js

import React from 'react';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box
      bgImage="url('/path-to-your-background-image.jpg')"
      bgSize="cover"
      bgPosition="center"
      minHeight="100vh"
      p={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="100%" maxWidth="1200px">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
