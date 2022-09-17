import { rem } from '@assets/styles/utils';
import styled, { css } from 'styled-components';

interface StyledButtonProps {
  danger?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${rem(56)};
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 0 ${rem(16)};

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
    background-color: #ccc !important;
    cursor: default;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background-color: ${theme.colors.danger.main};

      &:hover {
        background-color: ${theme.colors.danger.light};
      }

      &:active {
        background-color: ${theme.colors.danger.dark};
      }
    `}
`;

StyledButton.defaultProps = {
  danger: false,
};
