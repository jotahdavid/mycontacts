import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Modal } from '@components/Modal';
import {
  Card, Header, InputSearchContainer, ListContainer,
} from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';
import editIcon from '@assets/images/icons/edit.svg';
import trashIcon from '@assets/images/icons/trash.svg';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category_id?: string;
  category_name?: string;
}

export function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/contacts');
      const contactsJSON = await response.json();
      setContacts(contactsJSON);
    })();
  }, []);

  return (
    <>
      {false && <Modal danger />}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <h3>
          {contacts.length}
          &nbsp;
          {contacts.length === 1 ? 'contato' : 'contatos'}
        </h3>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrowIcon} alt="Seta apontando para cima" />
          </button>
        </header>

        <ul style={{ paddingBottom: '2rem' }}>
          {Array.isArray(contacts) && contacts.map((contact) => (
            <Card as="li" key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={editIcon} alt="Ícone de editar" />
                </Link>
                <button type="button">
                  <img src={trashIcon} alt="Ícone de uma lixeira" />
                </button>
              </div>
            </Card>
          ))}
        </ul>
      </ListContainer>
    </>
  );
}
