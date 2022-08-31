import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '@styles/global';
import defaultTheme from '@styles/themes/default';
import MyRoutes from '../../Routes';

import { Container } from './styles';
import { Header } from '@components/Header';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          <Header />
          <MyRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
