import ReactDOM from 'react-dom';

import { Overlay, Loading } from './styles';

export function Loader() {
  return ReactDOM.createPortal(
    <Overlay>
      <Loading />
    </Overlay>,
    document.getElementById('loader-root')!,
  );
}
