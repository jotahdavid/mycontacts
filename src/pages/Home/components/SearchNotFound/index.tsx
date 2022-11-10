/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import magnifierImage from '@assets/images/magnifier-question.svg';

interface SearchNotFoundProps {
  searchTerm: string;
}

export function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
  return (
    <Container>
      <img src={magnifierImage} alt="Ícone de uma lupa vermelha" />
      <p>
        Nenhum resultado foi encontrado para <strong>&ldquo;{searchTerm}&rdquo;</strong>.
      </p>
    </Container>
  );
}
