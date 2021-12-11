import styled from "styled-components";
import { device } from "./Breakpoints";

interface Props {
  backgroundImage: string | undefined;
}

export const App = styled.main<Props>`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  background-image: url("
    ${(Props) => (Props.backgroundImage ? Props.backgroundImage : "")} ");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto auto;
  box-shadow: inset 0 0 0 100vmax rgba(0, 0, 0, 0.2);
  overflow: hidden;
  overflow-y: auto;
  position: fixed;

  ${device.sm`
   grid-template-columns: 100%;

  `};
`;
