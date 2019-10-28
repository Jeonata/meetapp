import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;
  width: 100%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    & > div {
      margin-bottom: 10px;
    }

    img,
    div {
      height: 300px;
      width: 100%;
      object-fit: cover;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.3);

      svg {
        margin-bottom: 10px;
      }
    }
    input {
      display: none;
    }
  }
`;
