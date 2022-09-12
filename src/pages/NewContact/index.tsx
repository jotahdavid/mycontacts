import toast from '@utils/toast';

import ContactsService from '@services/ContactsService';
import type { Contact } from '@services/ContactsService';

import { PageHeader } from '@components/PageHeader';
import { ContactForm } from '@components/ContactForm';

export function NewContact() {
  async function handleSubmit(contact: Contact) {
    try {
      await ContactsService.createContact(contact);

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
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </section>
  );
}
