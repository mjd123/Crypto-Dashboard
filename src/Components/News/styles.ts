import styled from "styled-components";
import { Row } from "antd";
import { PageText as NewsText } from "../../helpers/PageText";
import { Wrapper as NewsWrapper } from "../../helpers/Wrapper";
import { device } from "../../styles/Breakpoints";

export const Text = styled(NewsText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

export const Wrapper = styled(NewsWrapper)`
  position: relative;
  grid-row: auto;
  grid-column: 1;
  box-shadow: inset 0 0 0 100vmax rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  margin: 20px;
  width: 100%;
  max-width: 300px;
  height: auto;
  padding: 10px;
  justify-self: start;
  width: fit-content;
  ${device.md`
    grid-column: 1 / span 2;
    margin:auto;
    justify-self:center;
    height:fit-content;
  `};
`;

export const StyledRow = styled(Row)`
  height: auto;
  margin: 0;
`;
