import { ZipCodeValidator, CountryCodeValidator } from "./lib/Validator/ZipCodeValidator";

let myZipCodeValidator = new ZipCodeValidator();
console.log("Zip is Valid ", myZipCodeValidator.isAcceptable("12544"));
