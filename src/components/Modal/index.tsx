import { Button } from '@components/Button';
import ReactDOM from 'react-dom';
import { Container, Footer, Overlay } from './styles';

interface ModalProps {
  danger?: boolean;
}
export function Modal({ danger }: ModalProps) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1 className="title">Modal</h1>
        <p className="description">Esta ação...</p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal-root")!
  );
}

Modal.defaultProps = {
  danger: false,
};
