import { ReactNode } from 'react';
import { Container, ErrorMessage } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
}

export function FormGroup({ children, error }: FormGroupProps) {
  return (
    <Container>
      {children}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
};
