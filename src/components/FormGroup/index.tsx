import { ReactNode } from 'react';
import { Container, ErrorMessage, Spinner } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
  loading?: boolean;
}

export function FormGroup({ children, error, loading }: FormGroupProps) {
  return (
    <Container>
      {loading && <Spinner />}
      {children}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
  loading: false,
};
