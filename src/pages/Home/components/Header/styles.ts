import styled, { css, CSSProperties } from 'styled-components';
import { rem } from '@assets/styles/utils';

interface StyledContainerProps {
  justifyContent?: CSSProperties['justifyContent'];
}

export const Container = styled.header<StyledContainerProps>`
  ${({ theme, justifyContent }) => css`
    display: flex;
    align-items: center;
    justify-content: ${justifyContent};
    border-bottom: 2px solid ${theme.colors.gray[100]};
    padding-bottom: ${rem(16)};

    h3 {
      color: ${theme.colors.gray[900]};
      font-size: ${rem(24)};
    }

    a {
      font-size: ${rem(16)};
      font-weight: bold;
      text-decoration: none;
      color: ${theme.colors.primary.main};

      border: 2px solid ${theme.colors.primary.main};
      border-radius: 4px;
      padding: ${rem(10)} ${rem(16)};

      transition: color 200ms ease, background-color 300ms ease;

      &:hover {
        background-color: ${theme.colors.primary.main};
        color: #fff;
      }
    }
  `}
`;

Container.defaultProps = {
  justifyContent: 'initial',
};
