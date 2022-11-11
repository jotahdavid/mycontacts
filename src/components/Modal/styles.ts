import styled, { css, keyframes } from 'styled-components';
import { rem } from '@assets/styles/utils';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;
const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

interface StyledOverlayProps {
  isLeaving: boolean;
}

export const Overlay = styled.div<StyledOverlayProps>`
  width: 100%;
  height: 100%;

  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${fadeIn} 300ms;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 300ms forwards;`}
`;

interface StyledContainerProps {
  danger?: boolean;
  isLeaving: boolean;
}

export const Container = styled.div<StyledContainerProps>`
  ${({ theme, danger, isLeaving }) => css`
    max-width: ${rem(450)};
    width: 90%;
    margin: 0 auto;

    background-color: #fff;
    padding: ${rem(24)};

    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

    animation: ${scaleIn} 300ms;

    ${isLeaving && css`animation: ${scaleOut} 300ms forwards;`}

    .title {
      font-weight: bold;
      font-size: ${rem(22)};
      margin-bottom: ${rem(16)};

      color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
    }

    .modal-body {
      color: ${theme.colors.gray[900]};
      margin-bottom: ${rem(32)};
    }
  `}
`;

Container.defaultProps = {
  danger: false,
};

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${rem(8)};
  width: 100%;

  button {
    width: 90%;
  }

  .cancel-button {
    border: none;
    border-radius: 4px;
    background-color: #f2f2f2;

    font-size: ${rem(16)};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray[200]};

    height: ${rem(56)};

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
