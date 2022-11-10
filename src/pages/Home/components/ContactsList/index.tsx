import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import type { ContactResponseMapped, OrderBy } from '@services/ContactsService';
import formatPhoneNumber from '@utils/formatPhoneNumber';

import { Container, Card } from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';
import editIcon from '@assets/images/icons/edit.svg';
import trashIcon from '@assets/images/icons/trash.svg';

type Contact = ContactResponseMapped;

interface ContactsListProps {
  contacts: Contact[];
  orderBy: OrderBy;
  onToggleOrderBy: (event: MouseEvent<HTMLButtonElement>) => void;
  onDeleteContactClick: (contact: Contact) => void;
}

export function ContactsList({
  contacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContactClick,
}: ContactsListProps) {
  return (
    <Container orderBy={orderBy}>
      <header>
        {contacts.length > 0 && (
          <button
            type="button"
            onClick={onToggleOrderBy}
          >
            <span>Nome</span>
            <img src={arrowIcon} alt="Seta azul" />
          </button>
        )}
      </header>

      <ul style={{ paddingBottom: '2rem' }}>
        {contacts.map((contact) => (
          <Card as="li" key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category.name && (
                  <small>{contact.category.name}</small>
                )}
              </div>

              <span>{contact.email}</span>
              <span>{formatPhoneNumber(contact.phone ?? '')}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={editIcon} alt="Ícone de editar" />
              </Link>
              <button
                type="button"
                onClick={() => onDeleteContactClick(contact)}
              >
                <img src={trashIcon} alt="Ícone de uma lixeira" />
              </button>
            </div>
          </Card>
        ))}
      </ul>
    </Container>
  );
}
