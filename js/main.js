import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {onClick,getValue,setValue,setInner} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import { postWithToken,getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {piggi} from "/daftar/img/svg.js";

if (getCookie("login")){
    getWithHeader("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),tokenFunction);
}else{
    redirect("/login");
}

function tokenFunction(result){
    console.log(result);
    onClick("submit",PostSignUp);
}



function PostSignUp(){
    let datainjson = {
        "nama": getValue("nama"),
        "email": getValue("email"),
        "nik":getValue("nik"),
        "pekerjaan":getValue("pekerjaan"),
        "alamat":getValue("alamat")
    }
    setInner("formsection",piggi);
    postWithToken("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    
}