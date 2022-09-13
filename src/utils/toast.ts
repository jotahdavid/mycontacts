import EventManager from '@lib/EventManager';
import { ToastMessageType } from '@components/Toast/ToastMessage';

export type ToastPayload = {
  type: ToastMessageType;
  text: string;
  duration?: number;
};

export const ToastEventManager = new EventManager<ToastPayload>();

function addToast(toast: ToastPayload) {
  ToastEventManager.emit('addtoast', toast);
}

function createHandler(type: ToastMessageType) {
  return (text: string, duration?: number) => addToast({ type, text, duration });
}

const toast = (text: string, duration?: number) => createHandler('default')(text, duration);
toast.danger = createHandler('danger');
toast.sucess = createHandler('sucess');

export default toast;
