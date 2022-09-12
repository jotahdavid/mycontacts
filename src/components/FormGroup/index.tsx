import { ReactNode } from 'react';

import { Spinner } from '@components/Spinner';
import { Container, ErrorMessage, SpinnerContainer } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
  loading?: boolean;
}

export function FormGroup({ children, error, loading }: FormGroupProps) {
  return (
    <Container>
      {loading && (
        <SpinnerContainer>
          <Spinner size={20} />
        </SpinnerContainer>
      )}
      {children}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
  loading: false,
};
