import { Button } from '@components/Button';
import { Container } from './styles';

import sadFaceImage from '@assets/images/sad.svg';

interface ErrorStatusProps {
  onTryAgain: () => void;
}

export function ErrorStatus({ onTryAgain }: ErrorStatusProps) {
  return (
    <Container>
      <img src={sadFaceImage} alt="Carinha triste" />
      <div className="details">
        <strong>Ocorreu um error ao obter os seus contatos!</strong>
        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}
