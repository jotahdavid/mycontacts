import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.header`
  margin-bottom: ${rem(48)};
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    max-width: 201px;
  }
`;
