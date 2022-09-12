import { Container } from './styles';

import errorCircleIcon from '@assets/images/icons/x-circle.svg';
import checkCircleIcon from '@assets/images/icons/check-circle.svg';

export type ToastMessageType = 'default' | 'sucess' | 'danger';

interface ToastMessageProps {
  message: {
    id: number;
    text: string;
    type?: ToastMessageType;
  };
  onRemove: (id: number) => void;
}

export function ToastMessage({ message, onRemove }: ToastMessageProps) {
  function handleRemoveToast() {
    onRemove(message.id);
  }

  return (
    <Container
      type={message.type ?? 'default'}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'sucess' && (
        <img src={checkCircleIcon} alt="Ícone de um círculo com um X dentro" />
      )}
      {message.type === 'danger' && (
        <img src={errorCircleIcon} alt="Ícone de um círculo com um check dentro" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}
