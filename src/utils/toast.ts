import { ToastMessageType } from '@components/Toast/ToastMessage';

function addToast(detail: { type: ToastMessageType; text: string; }) {
  const event = new CustomEvent('addtoast', { detail });
  document.dispatchEvent(event);
}

function createHandler(type: ToastMessageType) {
  return (text: string) => addToast({ type, text });
}

const toast = (text: string) => createHandler('default')(text);
toast.danger = createHandler('danger');
toast.sucess = createHandler('sucess');

export default toast;
