import ReactDOM from 'react-dom';

import { Overlay, Loading } from './styles';

interface LoaderProps {
  loading: boolean;
}

export function Loader({ loading }: LoaderProps) {
  if (!loading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Loading />
    </Overlay>,
    document.getElementById('loader-root')!,
  );
}
