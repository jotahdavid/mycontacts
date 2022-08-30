import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
  }

  button {
    cursor: pointer;
  }
`;
