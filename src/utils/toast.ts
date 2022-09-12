import EventManager from '@lib/EventManager';
import { ToastMessageType } from '@components/Toast/ToastMessage';

export type ToastPayload = {
  type: ToastMessageType;
  text: string;
};

export const ToastEventManager = new EventManager<ToastPayload>();

function addToast(toast: ToastPayload) {
  ToastEventManager.emit('addtoast', toast);
}

function createHandler(type: ToastMessageType) {
  return (text: string) => addToast({ type, text });
}

const toast = (text: string) => createHandler('default')(text);
toast.danger = createHandler('danger');
toast.sucess = createHandler('sucess');

export default toast;
