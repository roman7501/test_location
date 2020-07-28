import { createGlobalStyle } from "styled-components";

import "sanitize.css";
import "sanitize.css/typography.css";

const Global = createGlobalStyle`

body{
    font-size: 16px;
    background: black;
    color: white;
    margin-top:0;
}
`;

export default Global;
