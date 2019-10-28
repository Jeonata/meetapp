import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      color: #fff;
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 20px;
      margin: 0 0 10px;
      font-size: 18px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      font-weight: bold;
      font-size: 14px;
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    button {
      margin: 5px 0 0;
      height: 50px;
      border: 0;
      border-radius: 4px;
      background-color: #f94d6a;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }

    a {
      font-weight: bold;
      font-size: 16px;
      margin-top: 20px;
      color: #fff;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
