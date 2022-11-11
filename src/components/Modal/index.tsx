import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@components/Button';
import { Container, Footer, Overlay } from './styles';
import useAnimatedUnmount from '@hooks/useAnimatedUnmount';

interface ModalProps {
  children: ReactNode;
  danger?: boolean;
  visible: boolean;
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function Modal({
  children, danger, visible, title, cancelLabel, confirmLabel, loading, onCancel, onConfirm,
}: ModalProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount<HTMLDivElement>(visible);

  if (!shouldRender) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay ref={animatedElementRef} isLeaving={!visible}>
      <Container danger={danger} isLeaving={!visible}>
        <h1 className="title">{title}</h1>

        <div className="modal-body">
          {children}
        </div>

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <Button
            type="button"
            danger
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')!,
  );
}

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  loading: false,
};
