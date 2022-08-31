import { rem } from '@assets/styles/utils';
import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: ${rem(56)};
  background-color: ${({ theme }) => theme.colors.primary.main};

  border: none;
  border-radius: 4px;

  font-size: ${rem(16)};
  font-weight: bold;
  color: #fff;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    transition: none;
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;
