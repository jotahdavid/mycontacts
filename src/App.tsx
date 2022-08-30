import { ThemeProvider, ThemeProviderProps } from 'styled-components';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <h1>Hello world!</h1>
    </ThemeProvider>
  );
}
