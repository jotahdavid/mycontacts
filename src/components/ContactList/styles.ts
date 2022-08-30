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
      font-weight: bold;
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

export const ListContainer = styled.div`
  margin-top: ${rem(24)};

  header {
    margin-bottom: ${rem(8)};

    button {
      background-color: transparent;
      border: none;

      display: flex;
      align-items: center;

      span {
        margin-right: ${rem(8)};
        font-weight: bold;
        font-size: ${rem(16)};
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }

  ul {
    list-style: none;
  }
`;

export const Card = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: ${rem(16)};
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: ${rem(8)};
      }
    }

    > span {
      display: block;
      font-size: ${rem(14)};
      color: ${({ theme }) => theme.colors.gray[200]};

      & + span {
        margin-top: 4px;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      margin-left: ${rem(8)};
    }
  }
`;
