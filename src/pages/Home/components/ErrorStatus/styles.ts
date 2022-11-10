import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div`
  margin-top: ${rem(16)};
  display: flex;
  align-items: center;
  gap: ${rem(24)};

  .details {
    strong {
      font-size: ${rem(22)};
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: ${rem(12)};
    }

    button {
      height: ${rem(44)};
    }
  }
`;
