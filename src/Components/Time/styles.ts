import styled from "styled-components";
import { PageText as TimeText } from "../../helpers/PageText";
import { Wrapper as TimeWrapper } from "../../helpers/Wrapper";
import { device } from "../../styles/Breakpoints";

export const Text = styled(TimeText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

export const Wrapper = styled(TimeWrapper)`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.justifyContent};
  padding: 20px;
  ${device.sm`
    justify-content:center;
    padding:5px;
    align-self:auto;
  `};
`;
