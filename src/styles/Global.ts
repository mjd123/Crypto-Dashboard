import { createGlobalStyle } from "styled-components";
import { device } from "./Breakpoints";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
       box-sizing: border-box;
   }
   #root{
       margin:0 auto;
       box-sizing: border-box;
       height: 200vh;
   }

   body {
        @media only screen and (min-width: 768px) {
            overflow: hidden;
        }
   }
`;
