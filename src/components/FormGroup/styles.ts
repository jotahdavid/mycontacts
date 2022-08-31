import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div``;

export const ErrorMessage = styled.small`
  display: block;
  margin-top: ${rem(8)};

  color: ${({ theme }) => theme.colors.danger.main};
  font-size: ${rem(12)};
`;
