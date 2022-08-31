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
  #root,
  #modal-root,
  #loader-root {
    width: 100%;
    height: 100%;
  }

  #modal-root,
  #loader-root {
    position: fixed;
    inset: 0;
    pointer-events: none;

    > * {
      pointer-events: initial;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  button {
    cursor: pointer;
  }
`;
