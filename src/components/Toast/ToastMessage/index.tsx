import { useEffect, useRef } from 'react';

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
  onRemove: (id: number) => void;
  onAnimationEnd: (id: number) => void;
}

export function ToastMessage({
  message, onRemove, isLeaving, onAnimationEnd,
}: ToastMessageProps) {
  const animatedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const animatedElement = animatedElementRef.current;

    if (isLeaving && animatedElement) {
      animatedElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      animatedElement?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, message.id, onAnimationEnd]);

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
      ref={animatedElementRef}
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
