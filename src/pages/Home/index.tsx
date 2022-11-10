import { Loader } from '@components/Loader';
import { Modal } from '@components/Modal';

import { useHome } from './useHome';

import { InputSearch } from './components/InputSearch';
import { Header } from './components/Header';
import { ErrorStatus } from './components/ErrorStatus';
import { EmptyListMessage } from './components/EmptyListMessage';

import { SearchNotFound } from './components/SearchNotFound';
import { ContactsList } from './components/ContactsList';

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
      <Loader loading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        contactsAmount={contacts.length}
        filteredContactsAmount={filteredContacts.length}
      />

      {hasError && (
        <ErrorStatus onTryAgain={loadContacts} />
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListMessage />
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            contacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContactClick={handleDeleteContactClick}
          />

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
        </>
      )}
    </>
  );
}
