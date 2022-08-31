import { PageHeader } from '@components/PageHeader';
import { ContactForm } from '@components/ContactForm';

export function NewContact() {
  return (
    <section>
      <PageHeader
        title="Novo contato"
      />

      <ContactForm
        buttonLabel="Cadastrar"
      />
    </section>
  );
}
