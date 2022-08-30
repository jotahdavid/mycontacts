import { Container, InputSearchContainer } from './styles';

import logo from '@assets/images/logo.svg';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="Logo do MyContacts" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>
    </Container>
  );
}
