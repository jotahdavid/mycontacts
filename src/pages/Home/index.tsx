import { Link } from 'react-router-dom';

import { Modal } from '@components/Modal';
import {
  Card, Header, InputSearchContainer, ListContainer
} from './styles';

import arrowIcon from '@assets/images/icons/arrow.svg';
import editIcon from '@assets/images/icons/edit.svg';
import trashIcon from '@assets/images/icons/trash.svg';

export function Home() {
  return (
    <>
      <Modal danger />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <h3>3 contatos</h3>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrowIcon} alt="Seta apontando para cima" />
          </button>
        </header>

        <ul>
          <Card as="li">
            <div className="info">
              <div className="contact-name">
                <strong>Mateus Silva</strong>
                <small>Instagram</small>
              </div>

              <span>mateus@devacademy.com.br</span>
              <span>(41) 99999-9999</span>
            </div>

            <div className="actions">
              <Link to="/edit/id">
                <img src={editIcon} alt="Ícone de editar" />
              </Link>
              <button type="button">
                <img src={trashIcon} alt="Ícone de uma lixeira" />
              </button>
            </div>
          </Card>
          <Card as="li">
            <div className="info">
              <div className="contact-name">
                <strong>Mateus Silva</strong>
                <small>Instagram</small>
              </div>

              <span>mateus@devacademy.com.br</span>
              <span>(41) 99999-9999</span>
            </div>

            <div className="actions">
              <Link to="/edit/id">
                <img src={editIcon} alt="Ícone de editar" />
              </Link>
              <button type="button">
                <img src={trashIcon} alt="Ícone de uma lixeira" />
              </button>
            </div>
          </Card>
          <Card as="li">
            <div className="info">
              <div className="contact-name">
                <strong>Mateus Silva</strong>
                <small>Instagram</small>
              </div>

              <span>mateus@devacademy.com.br</span>
              <span>(41) 99999-9999</span>
            </div>

            <div className="actions">
              <Link to="/edit/id">
                <img src={editIcon} alt="Ícone de editar" />
              </Link>
              <button type="button">
                <img src={trashIcon} alt="Ícone de uma lixeira" />
              </button>
            </div>
          </Card>
        </ul>
      </ListContainer>
    </>
  );
}
