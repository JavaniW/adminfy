import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  justify-content: center;
  text-decoration: none;
  /* font-size: 2rem; */
  color: #141414;

  &:hover {
    color: #8f8288;
  }
  &:focus {
    color: #442f38;
  }
  &:active {
    color: #442f38;
  }
`;

export default StyledLink;
