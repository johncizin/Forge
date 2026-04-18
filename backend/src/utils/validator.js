import { isEmail } from "validator";

export function validateEmail(email){
    return isEmail(email, {
        allow_utf8_local_part: false,
        require_tld: true,
        allow_ip_domain: false,
    })
}