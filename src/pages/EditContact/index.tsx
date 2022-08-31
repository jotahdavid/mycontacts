import { ContactForm } from '@components/ContactForm';
import { PageHeader } from '@components/PageHeader';

export function EditContact() {
  return (
    <section>
      <PageHeader
        title="Editar {Nome do Contato}"
      />

      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </section>
  );
}
