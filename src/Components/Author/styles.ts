import styled from "styled-components";
import { PageText as AuthorText } from "../../helpers/PageText";
import { Wrapper as AuthorWrapper } from "../../helpers/Wrapper";
import { device } from "../../styles/Breakpoints";

export const Text = styled(AuthorText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

export const Wrapper = styled(AuthorWrapper)`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: 20px;
  grid-row: 3;
  grid-column: 1;
  ${device.sm`
    padding:5px;
  `};
`;
