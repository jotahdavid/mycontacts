/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface HeaderProps {
  hasError: boolean;
  contactsAmount: number;
  filteredContactsAmount: number;
}

export function Header({ hasError, contactsAmount, filteredContactsAmount }: HeaderProps) {
  const alignment = hasError ? 'flex-end' : (
    contactsAmount > 0 ? 'space-between' : 'center'
  );

  return (
    <Container justifyContent={alignment}>
      {(!hasError && contactsAmount > 0) && (
        <h3>
          {filteredContactsAmount}
          &nbsp;
          {filteredContactsAmount === 1 ? 'contato' : 'contatos'}
        </h3>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}
