import { rem } from '@assets/styles/utils';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: ${rem(32)};
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #222;
      font-size: ${rem(24)};
    }

    a {
      font-size: ${rem(16)};
      font-weight: 700;
      text-decoration: none;
      color: ${theme.colors.primary.main};

      border: 2px solid ${theme.colors.primary.main};
      border-radius: 4px;
      padding: ${rem(10)} ${rem(16)};

      transition: color 200ms ease, background-color 300ms ease;

      &:hover {
        background-color: ${theme.colors.primary.main};
        color: #fff;
      }
    }
  `}
`;
