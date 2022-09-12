import styled, { css } from 'styled-components';
import { rem } from '@assets/styles/utils';
import type { ToastMessageType } from '@components/Toast/ToastMessage';

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  sucess: css`
    background-color: ${({ theme }) => theme.colors.sucess.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
};

type StyledContainerProps = {
  type: ToastMessageType
};

export const Container = styled.div<StyledContainerProps>`
  padding: ${rem(16)} ${rem(32)};
  border-radius: 4px;
  font-weight: 700;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  &:focus {
    background-color: rebeccapurple;
  }

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: ${rem(12)};
  }
`;
