import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {setInner,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import { postWithToken } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";

//check if login cookies is exist
if(!getCookie("login")){
    redirect("/");
}


function PostSignUp(){
    let datainjson = {
        "nama": getValue("nama"),
        "email": getValue("email"),
        "phone":getValue("phone"),
        "nik":getValue("nik"),
        "pekerjaan":getValue("pekerjaan"),
        "alamat":getValue("alamat")
    }
    postWithToken("https://ped.fly.dev/auth/daftar","login",getCookie("login"),datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
}