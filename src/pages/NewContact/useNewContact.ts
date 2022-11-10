import { useRef } from 'react';

import ContactsService from '@services/ContactsService';
import type { Contact } from '@services/ContactsService';
import toast from '@utils/toast';

import type { ContactFormRef } from '@components/ContactForm';

export function useNewContact() {
  const contactFormRef = useRef<ContactFormRef>(null);

  async function handleSubmit(contact: Contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current?.resetFields();

      toast.sucess('Contato cadastrado com sucesso!');
    } catch {
      toast.danger('Ocorreu um erro ao cadastrar o contato!');
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
