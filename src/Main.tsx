import * as React from "react";
import * as ReactDom from "react-dom";

import { ZipCodeValidator, CountryCodeValidator } from "./lib/Validator/ZipCodeValidator";
import { Hello } from "./components/Hello";

let myZipCodeValidator = new ZipCodeValidator();
console.log("Zip is Valid ", myZipCodeValidator.isAcceptable("12544"));

ReactDom.render(
    <Hello compiler="Typescript" framework= "React" />,
    document.getElementById("example")
);
