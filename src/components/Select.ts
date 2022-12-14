import styled from 'styled-components';

import { Input } from '@components/Input';

export const Select = styled(Input).attrs({ as: 'select' })`
  &:disabled {
    color: #cfcfcf;
    option {
      opacity: 1;
    }
  }
`;
