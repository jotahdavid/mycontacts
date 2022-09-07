import {
  ChangeEvent, useEffect, useState, useMemo,
} from 'react';
import { Link } from 'react-router-dom';

import ContactsService from '@services/ContactsService';
import type { ContactResponse, OrderBy } from '@services/ContactsService';

import { Modal } from '@components/Modal';
import { Loader } from '@components/Loader';
import {
  Card, Header, InputSearchContainer, ListContainer,
} from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';
import editIcon from '@assets/images/icons/edit.svg';
import trashIcon from '@assets/images/icons/trash.svg';

type Contact = ContactResponse;

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>('ASC');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [contacts, searchTerm]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [orderBy]);

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = event.target.value.trim();
    setSearchTerm(newSearchTerm);
  }

  function handleToggleOrderBy() {
    if (isLoading) return;
    setOrderBy((prevState) => (
      prevState === 'ASC' ? 'DESC' : 'ASC'
    ));
  }

  return (
    <>
      {false && <Modal danger />}
      <Loader loading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <h3>
          {filteredContacts.length}
          &nbsp;
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </h3>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer orderBy={orderBy}>
        <header>
          {filteredContacts.length > 0 && (
            <button
              type="button"
              onClick={handleToggleOrderBy}
            >
              <span>Nome</span>
              <img src={arrowIcon} alt="Seta azul" />
            </button>
          )}
        </header>

        <ul style={{ paddingBottom: '2rem' }}>
          {filteredContacts.map((contact) => (
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
