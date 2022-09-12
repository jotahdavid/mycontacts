import { rem } from '@assets/styles/utils';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${rem(440)};
  width: 90%;

  position: fixed;
  z-index: 10;
  bottom: ${rem(48)};
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
