import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';

export const Button = styled(ButtonAntd)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
