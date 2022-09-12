import { Container } from './styles';

import errorCircleIcon from '@assets/images/icons/x-circle.svg';
import checkCircleIcon from '@assets/images/icons/check-circle.svg';

export type ToastMessageType = 'default' | 'sucess' | 'danger';

interface ToastMessageProps {
  text: string;
  type?: ToastMessageType;
}

export function ToastMessage({ text, type = 'default' }: ToastMessageProps) {
  return (
    <Container type={type}>
      {type === 'sucess' && <img src={checkCircleIcon} alt="Ícone de um círculo com um X dentro" />}
      {type === 'danger' && <img src={errorCircleIcon} alt="Ícone de um círculo com um check dentro" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.defaultProps = {
  type: 'default',
};
