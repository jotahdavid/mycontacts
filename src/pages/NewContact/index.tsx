import { PageHeader } from '@components/PageHeader';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Button } from '@components/Button';

import { Container, Form } from './styles';

export function NewContact() {
  return (
    <Container>
      <PageHeader title="Novo contato" />

      <Form>
        <Input type="text" placeholder="Nome" />
        <Input type="email" placeholder="E-mail" />
        <Input type="tel" placeholder="Telefone" />
        <Select>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </Select>

        <Button type="button">Cadastrar</Button>
      </Form>
    </Container>
  );
}
