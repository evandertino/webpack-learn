import { StringValidator } from "./Validations";

const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

class CountryCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        console.log("hello world");
        return s === "Ke";
    }
}

export { numberRegexp };
export { ZipCodeValidator, CountryCodeValidator };
