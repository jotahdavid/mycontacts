import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div`
  margin-top: ${rem(16)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${rem(24)};

  img {
    align-self: flex-start;
  }

  p {
    font-size: ${rem(16)};
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  strong {
    font-size: inherit;
    color: inherit;
    word-break: break-word;
  }
`;
