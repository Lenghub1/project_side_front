import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
div {
    overflow : hidden;

    #root {
        width : inherit;
        height : inherit;


       }

   h1,h2,h3,h4,h5,h6, p{
    margin : 0px;
   }

   a {
    color: #f03c3c
   }

}

`;

export default GlobalStyles;
