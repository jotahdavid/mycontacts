import { forwardRef } from 'react';

import type { Contact } from '@services/ContactsService';

import formatPhoneNumber from '@utils/formatPhoneNumber';

import { Button } from '@components/Button';
import { FormGroup } from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';

import { ButtonContainer, Form } from './styles';
import { useContactForm } from './useContactForm';

interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (contact: Contact) => Promise<void>;
}

export interface ContactFormRef {
  setFieldsValues: (contact: Contact) => void;
  resetFields: () => void;
}

export const ContactForm = forwardRef<ContactFormRef, ContactFormProps>((
  { buttonLabel, onSubmit },
  ref,
) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  } = useContactForm({ onSubmit, ref });

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome *"
          error={Boolean(getErrorMessageByFieldName('name'))}
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          error={Boolean(getErrorMessageByFieldName('email'))}
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('phone')}>
        <Input
          type="tel"
          placeholder="Telefone"
          error={Boolean(getErrorMessageByFieldName('phone'))}
          value={formatPhoneNumber(phone)}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup loading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={({ target }) => setCategoryId(target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          loading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});
