import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div`
  margin-bottom: ${rem(32)};
  width: 100%;

  input {
    width: 100%;
    height: ${rem(50)};
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    padding: 0 1rem;
    outline: 0;

    border: none;
    border-radius: 24px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;
