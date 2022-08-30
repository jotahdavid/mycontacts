import 'styled-components';
import defaultTheme from './assets/styles/themes/default';

type MyDefaultTheme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends MyDefaultTheme {}
}
