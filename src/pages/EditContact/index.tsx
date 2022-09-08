import { ContactForm } from '@components/ContactForm';
import { Loader } from '@components/Loader';
import { PageHeader } from '@components/PageHeader';

export function EditContact() {
  return (
    <section>
      <Loader loading />

      <PageHeader
        title="Editar {Nome do Contato}"
      />

      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </section>
  );
}
