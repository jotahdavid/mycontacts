import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

interface StyledContainerProps {
  orderBy: 'ASC' | 'DESC'
}

export const Container = styled.div<StyledContainerProps>`
  margin-top: ${rem(24)};

  header {
    margin-bottom: ${rem(8)};

    button {
      background-color: transparent;
      border: none;

      display: flex;
      align-items: center;
      padding: 0.5rem;

      span {
        margin-right: ${rem(8)};
        font-weight: bold;
        font-size: ${rem(16)};
        color: ${({ theme }) => theme.colors.primary.main};
      }

      img {
        transform: ${({ orderBy }) => (orderBy === 'DESC' ? 'rotate(180deg)' : 'rotate(0)')};
        transition: transform 200ms ease-in;
      }
    }
  }

  ul {
    list-style: none;
  }
`;

Container.defaultProps = {
  orderBy: 'ASC',
};

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

    a,
    button {
      display: flex;
      align-items: center;
    }

    button {
      background-color: transparent;
      border: none;
      margin-left: ${rem(8)};
    }
  }
`;
