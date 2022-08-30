import { rem } from '@assets/styles/utils';
import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    max-width: 201px;
  }
`;

export const InputSearchContainer = styled.div`
  margin-top: ${rem(48)};
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
      color: #bcbcbc;
    }
  }
`;
