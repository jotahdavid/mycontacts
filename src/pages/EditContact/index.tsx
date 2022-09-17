import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContactsService from '@services/ContactsService';
import type { Contact } from '@services/ContactsService';
import toast from '@utils/toast';

import { ContactForm } from '@components/ContactForm';
import type { ContactFormRef } from '@components/ContactForm';
import { Loader } from '@components/Loader';
import { PageHeader } from '@components/PageHeader';

export function EditContact() {
  const { id: contactId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef<ContactFormRef>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const contact = await ContactsService.getContactById(contactId!);

        contactFormRef.current?.setFieldsValues({
          name: contact.name,
          email: contact.email ?? '',
          phone: contact.phone ?? '',
          categoryId: contact.category_id ?? '',
        });

        setContactName(contact.name);
        setIsLoading(false);
      } catch {
        toast.danger('Contato não encontrado!');
        navigate('/');
      }
    })();
  }, [contactId, navigate]);

  async function handleSubmit(contact: Contact) {
    try {
      const updatedContact = await ContactsService.updateContact(contactId!, contact);

      toast.sucess('Contato editado com sucesso!');
      setContactName(updatedContact.name);
    } catch {
      toast.danger('Ocorreu um erro ao editar o contato!');
    }
  }

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
