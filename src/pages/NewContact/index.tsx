import { useRef } from 'react';

import ContactsService from '@services/ContactsService';
import type { Contact } from '@services/ContactsService';
import toast from '@utils/toast';

import { PageHeader } from '@components/PageHeader';
import { ContactForm } from '@components/ContactForm';
import type { ContactFormRef } from '@components/ContactForm';

export function NewContact() {
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

  return (
    <section>
      <PageHeader
        title="Novo contato"
      />

      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </section>
  );
}
