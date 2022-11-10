import { Link } from 'react-router-dom';

import formatPhoneNumber from '@utils/formatPhoneNumber';

import { Modal } from '@components/Modal';
import { Loader } from '@components/Loader';
import { Button } from '@components/Button';
import {
  Card,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListContainer,
  NoContactMessage,
  NoContactFoundMessage,
} from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';
import editIcon from '@assets/images/icons/edit.svg';
import trashIcon from '@assets/images/icons/trash.svg';
import sadFaceImage from '@assets/images/sad.svg';
import emptyBoxImage from '@assets/images/empty-box.svg';
import magnifierImage from '@assets/images/magnifier-question.svg';

import { useHome } from './useHome';

export function Home() {
  const {
    showDeleteModal,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeletingContact,
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    loadContacts,
    orderBy,
    handleDeleteContactClick,
    handleToggleOrderBy,
  } = useHome();

  return (
    <>
      <Modal
        danger
        visible={showDeleteModal}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        loading={isDeletingContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
      <Loader loading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError ? 'flex-end' : (
            contacts.length > 0 ? 'space-between' : 'center'
          )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <h3>
            {filteredContacts.length}
            &nbsp;
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </h3>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sadFaceImage} alt="Carinha triste" />
          <div className="details">
            <strong>Ocorreu um error ao obter os seus contatos!</strong>
            <Button onClick={loadContacts}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <NoContactMessage>
              <img src={emptyBoxImage} alt="Caixa azul" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                <br />
                Clique no botão
                &nbsp;
                <strong>&ldquo;Novo contato&rdquo;</strong>
                &nbsp;
                à cima para cadastrar o seu primeiro!
              </p>
            </NoContactMessage>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <NoContactFoundMessage>
              <img src={magnifierImage} alt="Ícone de uma lupa vermelha" />
              <p>
                Nenhum resultado foi encontrado para
                &nbsp;
                <strong>
                  &ldquo;
                  {searchTerm}
                  &rdquo;
                </strong>
                .
              </p>
            </NoContactFoundMessage>
          )}

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
                      onClick={() => handleDeleteContactClick(contact)}
                    >
                      <img src={trashIcon} alt="Ícone de uma lixeira" />
                    </button>
                  </div>
                </Card>
              ))}
            </ul>
          </ListContainer>
        </>
      )}
    </>
  );
}
