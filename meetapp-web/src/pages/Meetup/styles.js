import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;
  width: 100%;

  form {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input,
    textarea {
      width: 100%;
      font-family: Roboto;
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 18px;
      line-height: 21px;
      color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 0 20px;

      &::placeholder {
        font-family: Roboto;
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      height: 50px;
    }

    textarea {
      padding-top: 20px;
      resize: none;
      height: 200px;
    }
  }
`;

export const ConfirmButton = styled.button`
  margin-top: 10px;
  height: 42px;
  width: 180px;
  background: #f94d6a;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  &:hover {
    background: ${darken(0.03, '#F94D6A')};
  }

  svg {
    margin-right: 10px;
  }
`;
