import { ContactForm } from '@components/ContactForm';

import { Loader } from '@components/Loader';
import { PageHeader } from '@components/PageHeader';

import { useEditContact } from './useEditContact';

export function EditContact() {
  const {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  } = useEditContact();

  return (
    <section>
      <Loader loading={isLoading} />

      <PageHeader
        title={contactName && `Editar contato: ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </section>
  );
}
