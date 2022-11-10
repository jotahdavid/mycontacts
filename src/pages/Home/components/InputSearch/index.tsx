import { ChangeEvent } from 'react';

import { Container } from './styles';

interface InputSearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputSearch({ value, onChange }: InputSearchProps) {
  return (
    <Container>
      <input
        type="text"
        placeholder="Pesquisar contato"
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}
