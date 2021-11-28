import styled from "styled-components/macro";
import { PageText as CardText } from "../../helpers/PageText";
import { Wrapper as CardWrapper } from "../../helpers/Wrapper";
import { device } from "../../styles/Breakpoints";

export const Text = styled(CardText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
  white-space: nowrap;
`;

export const Wrapper = styled(CardWrapper)`
  //display: flex;
  position: relative;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.justifyContent};
  padding: 10px;
  grid-row: 2 / 4;
  grid-column: 2;
  box-shadow: inset 0 0 0 100vmax rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  margin: 20px;
  justify-self: end;
  width: fit-content;
  height: fit-content;
  min-height: 300px;
  min-width: 300px;
  .ant-card :not(.expanded) {
    display: grid;
    grid-template: 1fr /35px auto;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    padding: 10px;

    .ant-card-body {
      padding: 0;
      display: grid;
      grid-template: 1fr /0 1fr 1fr 1fr;
      align-items: center;
      grid-column: 2;
      grid-row: 1;
      width: 100%;
    }
  }

  ${device.md`
    grid-column: 1 / span 2;
    margin:auto;
    justify-self:center;
    height:fit-content;
  `};
`;

export const CardTextWrapper = styled(CardWrapper)`
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  height: ${(props) => (props.height ? props.height : "100%")};
  width: 100%;
  grid-row: ${(props) => props.gridRow};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;

export const Image = styled.img`
  max-width: 15px;
`;
