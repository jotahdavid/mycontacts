import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default toast" />
      <ToastMessage text="Error toast" type="danger" />
      <ToastMessage text="Sucess toast" type="sucess" />
    </Container>
  );
}
