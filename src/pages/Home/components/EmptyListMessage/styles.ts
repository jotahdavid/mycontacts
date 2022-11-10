import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div`
  margin-top: ${rem(16)};
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: ${rem(16)};
    max-width: ${rem(402)};

    line-height: ${rem(20)};
    font-size: ${rem(16)};
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
  }

  strong {
    line-height: inherit;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.primary.main}
  }
`;
