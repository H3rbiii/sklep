import {setCookie, getCookie, deleteCookie} from "./helpers/cookie.js";

const d = new Date();
d.setHours(d.getHours() +1);
const utc = d.toUTCString();

setCookie('text', encodeURIComponent(`tytuł
opis`), 1);

console.log(getCookie("text"));

