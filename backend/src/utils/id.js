//reusing was initially for UUID(32) but prisma does that automatially
//this is my util for shortId using nanoId lib 
import nanoid from "nanoid";

export function generateShortId() {
    return nanoid(10);
}