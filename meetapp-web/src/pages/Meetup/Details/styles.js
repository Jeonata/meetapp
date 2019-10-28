import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;

  header {
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 680px) {
      flex-direction: column;

      strong {
        margin-bottom: 20px;
      }
    }

    strong {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    div {
      display: flex;
      flex-direction: row;
    }
  }

  main {
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    article {
      margin: 25px 0 30px;
      font-size: 18px;
      color: #fff;
      line-height: 32px;
      white-space: pre-line;
    }

    footer {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        transition: color 0.2s;

        :first-child {
          margin-right: 33px;
          margin-bottom: 10px;
        }

        svg {
          margin-right: 10px;
        }
      }

      a span:hover {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
`;

export const Button = styled.button`
  height: 42px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 15px;
  }
`;

export const BlueButton = styled(Button)`
  width: 116px;
  background-color: #4dbaf9;
  margin-right: 20px;
  transition: background 0.2s;

  :hover {
    background-color: ${darken(0.05, '#4dbaf9')};
  }
`;

export const RedButton = styled(Button)`
  width: 138px;
  background-color: #d44059;
  transition: background 0.2s;

  :hover {
    background-color: ${darken(0.05, '#d44059')};
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Alert = styled.div`
  border-radius: 4px;
  max-width: 400px;
  height: 200px;
  background-color: #402845;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  h1 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 24px;
  }

  p {
    color: #fff;
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Cancel = styled(Button)`
  margin-right: 10px;
  padding: 0 20px;
  background-color: #4dbaf9;
  :hover {
    background-color: ${darken(0.05, '#4dbaf9')};
  }
`;

export const Accept = styled(Button)`
  padding: 0 20px;
  background-color: #d44059;
  :hover {
    background-color: ${darken(0.05, '#d44059')};
  }
`;
