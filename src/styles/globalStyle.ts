import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    width : 100%;
    min-height : 100vh;
    overflow : hidden;

    #root {
        width : inherit;
        height : inherit;
<<<<<<< HEAD


=======
>>>>>>> f7ae203 (test: test api of employee with authorization header)
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
