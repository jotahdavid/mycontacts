import styled, { css } from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface StyledContainerProps {
  danger?: boolean;
}

export const Container = styled.div<StyledContainerProps>`
  ${({ theme, danger }) => css`
    max-width: ${rem(450)};
    width: 90%;
    margin: 0 auto;

    background-color: #fff;
    padding: ${rem(24)};

    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

    .title {
      font-weight: bold;
      font-size: ${rem(22)};
      margin-bottom: ${rem(8)};

      color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
    }

    .description {
      font-size: ${rem(16)};
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
    max-width: ${rem(100)};
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
  }
`;
