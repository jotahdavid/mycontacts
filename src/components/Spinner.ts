import { rem } from '@assets/styles/utils';
import styled, { keyframes } from 'styled-components';

const rotatingAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

type StyledSpinnerProps = {
  size?: number;
};

export const Spinner = styled.div<StyledSpinnerProps>`
  width: ${({ size }) => rem(size!)};
  height: ${({ size }) => rem(size!)};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 4px solid ${({ theme }) => theme.colors.primary.main};
  border-top-color: transparent;
  border-left-color: transparent;

  animation: ${rotatingAnimation} 800ms infinite linear;
`;

Spinner.defaultProps = {
  size: 20,
};
