import { Button } from '@components/Button';
import { FormGroup } from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';

import { ButtonContainer, Form } from './styles';

interface ContactFormProps {
  buttonLabel: string;
}

export function ContactForm({ buttonLabel }: ContactFormProps) {
  return (
    <Form>
      <FormGroup>
        <Input
          type="text"
          placeholder="Nome"
        />
      </FormGroup>

      <FormGroup error="O formato do e-mail é inválido.">
        <Input
          type="email"
          placeholder="E-mail"
          error
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          placeholder="Telefone"
        />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="button">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
