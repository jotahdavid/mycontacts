import { ChangeEvent, FormEvent, useState } from 'react';

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
}

export function ContactForm({ buttonLabel }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleNameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value);

    if (!target.value) {
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

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome *"
          error={Boolean(getErrorMessageByFieldName('name'))}
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          error={Boolean(getErrorMessageByFieldName('email'))}
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          placeholder="Telefone"
          value={formatPhoneNumber(phone)}
          onChange={({ target }) => setPhone(target.value.replace(/\D/g, '').slice(0, 11))}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="button"
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
