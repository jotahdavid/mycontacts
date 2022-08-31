import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.header`
  a {
    text-decoration: none;
    font-size: ${rem(16)};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};

    display: flex;
    align-items: center;

    img {
      transform: rotate(-90deg);
    }

    span {
      margin-left: ${rem(8)};
    }
  }

  h1 {
    font-size: ${rem(24)};
    margin: ${rem(8)} 0 ${rem(24)} 0;
  }
`;
