import styled from 'styled-components';

import { Input } from '@components/Input';

export const Select = styled(Input).attrs({ as: 'select' })`
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color:  ${({ theme }) => theme.colors.gray[100]};
  }
`;
