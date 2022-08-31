import { Link } from 'react-router-dom';

import { Container } from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title = 'Title' }: PageHeaderProps) {
  return (
    <Container>
      <Link to="/">
        <img src={arrowIcon} alt="Ícone de uma seta" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}
