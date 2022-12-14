import styled, { css } from 'styled-components';
import { rem } from '@assets/styles/utils';

interface StyledInputProps {
  error?: boolean;
}

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: ${rem(56)};

  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  appearance: none;

  border: none;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;

  font-size: ${rem(16)};

  transition: border-color 200ms ease-in;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color:  ${({ theme }) => theme.colors.gray[100]};
    opacity: 1;
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.danger.main};
      border-color: ${theme.colors.danger.main} !important;
    `}
`;

Input.defaultProps = {
  error: false,
};
