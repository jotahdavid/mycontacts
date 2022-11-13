import { useEffect } from 'react';

import { ToastEventManager } from '@utils/toast';
import type { ToastPayload } from '@utils/toast';
import useAnimatedList from '@hooks/useAnimatedList';

import { ToastMessage } from '@components/Toast/ToastMessage';
import type { ToastMessageType } from '@components/Toast/ToastMessage';
import { Container } from './styles';

interface Message {
  id: number;
  type: ToastMessageType;
  text: string;
  duration?: number;
}

export function ToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsId,
    handleRemoveMessage,
    handleAnimationEnd,
  } = useAnimatedList<Message>();

  useEffect(() => {
    function handleAddToast({ type, text, duration }: ToastPayload) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    ToastEventManager.on('addtoast', handleAddToast);
    return () => ToastEventManager.removeListener('addtoast', handleAddToast);
  }, [setMessages]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={handleRemoveMessage}
          isLeaving={pendingRemovalItemsId.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
