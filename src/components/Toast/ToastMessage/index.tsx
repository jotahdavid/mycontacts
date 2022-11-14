import { RefObject, useEffect } from 'react';

import { Container } from './styles';

import errorCircleIcon from '@assets/images/icons/x-circle.svg';
import checkCircleIcon from '@assets/images/icons/check-circle.svg';

export type ToastMessageType = 'default' | 'sucess' | 'danger';

interface ToastMessageProps {
  message: {
    id: number;
    text: string;
    type?: ToastMessageType;
    duration?: number;
  };
  isLeaving: boolean;
  animatedRef: RefObject<HTMLDivElement>;
  onRemove: (id: number) => void;
}

export function ToastMessage({
  message, onRemove, isLeaving, animatedRef,
}: ToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemove(message.id);
    }, message.duration ?? 4000);

    return () => clearTimeout(timeoutId);
  }, [message, onRemove]);

  function handleRemoveToast() {
    onRemove(message.id);
  }

  return (
    <Container
      type={message.type ?? 'default'}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
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
