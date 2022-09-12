/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';

import { Spinner } from '@components/Spinner';
import { StyledButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  danger?: boolean;
}

export function Button({
  children, loading, danger, type, disabled, ...props
}: ButtonProps) {
  return (
    <StyledButton
      danger={danger}
      type={type ?? 'button'}
      disabled={disabled || loading}
      {...props}
    >
      {!loading ? children : (
        <Spinner />
      )}
    </StyledButton>
  );
}

Button.defaultProps = {
  loading: false,
  danger: false,
};
