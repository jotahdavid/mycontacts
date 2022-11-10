/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import emptyBoxImage from '@assets/images/empty-box.svg';

export function EmptyListMessage() {
  return (
    <Container>
      <img src={emptyBoxImage} alt="Caixa azul" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        <br />
        Clique no botão
        <strong> &ldquo;Novo contato&rdquo; </strong>
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
