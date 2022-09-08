import ContactsService from '@services/ContactsService';
import type { Contact } from '@services/ContactsService';

import { PageHeader } from '@components/PageHeader';
import { ContactForm } from '@components/ContactForm';

export function NewContact() {
  async function handleSubmit(contact: Contact) {
    try {
      const response = await ContactsService.createContact(contact);
      console.log(response);
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato!');
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
