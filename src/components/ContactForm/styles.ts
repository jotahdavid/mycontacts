import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  margin-top: ${rem(8)};

  button {
    width: 100%;
  }
`;
