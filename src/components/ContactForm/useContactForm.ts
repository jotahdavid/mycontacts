import {
  ChangeEvent, FormEvent, useEffect, useImperativeHandle, useState,
} from 'react';

import CategoriesService from '@services/CategoriesService';
import type { CategoryResponse } from '@services/CategoriesService';
import type { Contact } from '@services/ContactsService';
import isEmailValid from '@utils/isEmailValid';

import useErrors from '@hooks/useErrors';

import type { ContactFormRef } from '.';

type UseContactFormProps = {
  onSubmit: (contact: Contact) => Promise<void>;
  ref: React.ForwardedRef<ContactFormRef>;
};

export function useContactForm({ onSubmit, ref }: UseContactFormProps) {
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
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
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

  return {
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
  };
}
