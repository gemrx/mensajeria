import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme, rem } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import '@mantine/core/styles.css';
import './main.css';

const theme = createTheme({
  headings: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '500',
    sizes: {
      h1: { 
        fontSize: rem(62) 
      },
    },
  }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <RouterProvider router={router}/>
      </MantineProvider>
    </StrictMode>
);
