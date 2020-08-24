import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background: #333;
  font-size: 16px;
  border-radius: 5px;
  color: #fff;
  margin: 0 1em;
  padding: 0.4em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: green;
    color: white;
  }

  &:disabled {
    background: #ccc;
  }
`;

export default Button;
