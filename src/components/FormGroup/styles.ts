import styled from 'styled-components';
import { rem } from '@assets/styles/utils';

export const Container = styled.div`
  position: relative;
`;

export const ErrorMessage = styled.small`
  display: block;
  margin-top: ${rem(8)};

  color: ${({ theme }) => theme.colors.danger.main};
  font-size: ${rem(12)};
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: calc(50% - ${rem(20)} / 2);
`;
