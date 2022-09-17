import {
  ChangeEvent, FormEvent, forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';

import CategoriesService from '@services/CategoriesService';
import type { CategoryResponse } from '@services/CategoriesService';
import type { Contact } from '@services/ContactsService';

import isEmailValid from '@utils/isEmailValid';
import formatPhoneNumber from '@utils/formatPhoneNumber';
import useErrors from '@hooks/useErrors';

import { Button } from '@components/Button';
import { FormGroup } from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';

import { ButtonContainer, Form } from './styles';

interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (contact: Contact) => Promise<void>;
}

export interface ContactFormRef {
  setFieldsValues: (contact: Contact) => void;
}

export const ContactForm = forwardRef<ContactFormRef, ContactFormProps>((
  { buttonLabel, onSubmit },
  ref,
) => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact: Contact) => {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setCategoryId(contact.categoryId);
    },
  }), []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingCategories(true);

        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {}

      setIsLoadingCategories(false);
    })();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name: name.trim(),
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  }

  function handleNameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value);

    if (!target.value.trim()) {
      setError({ field: 'name', message: 'Nome é obrigatório!' });
      return;
    }

    removeError('name');
  }

  function handleEmailChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);

    if (target.value && !isEmailValid(target.value)) {
      setError({ field: 'email', message: 'O formato do e-mail é inválido!' });
      return;
    }

    removeError('email');
  }

  function handlePhoneChange({ target }: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = target.value.replace(/\D/g, '');
    setPhone(onlyNumbers.slice(0, 11));

    if (onlyNumbers.length > 0 && onlyNumbers.length < 10) {
      setError({ field: 'phone', message: 'Número inválido!' });
      return;
    }

    removeError('phone');
  }

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
