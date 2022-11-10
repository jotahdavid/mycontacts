import {
  ChangeEvent, useEffect, useState, useMemo, useCallback,
} from 'react';

import ContactsService from '@services/ContactsService';
import type { ContactResponseMapped, OrderBy } from '@services/ContactsService';
import toast from '@utils/toast';

type Contact = ContactResponseMapped;

export function useHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingContact, setIsDeletingContact] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<Contact | null>(null);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      setContacts(contactsList);

      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

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

  function handleDeleteContactClick(contact: Contact) {
    setContactBeingDeleted(contact);
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setContactBeingDeleted(null);
    setShowDeleteModal(false);
  }

  async function handleConfirmDeleteContact() {
    setIsDeletingContact(true);
    try {
      if (!contactBeingDeleted?.id) return;
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts(
        (prevState) => prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      );
      handleCloseDeleteModal();

      toast.sucess('Contato deletado com sucesso!');
    } catch {
      toast.danger('Ocorreu um erro ao deletar o contato!');
    } finally {
      setIsDeletingContact(false);
      setShowDeleteModal(false);
    }
  }

  return {
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
    handleToggleOrderBy,
    handleDeleteContactClick,
  };
}
