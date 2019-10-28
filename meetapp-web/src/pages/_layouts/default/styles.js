import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
  padding-bottom: 50px;
`;

export const Content = styled.div`
  width: 100%;
  @media only screen and (max-width: 980px) {
    padding: 0 10px;
  }
`;
