import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {onClick,getValue,setValue,setInner} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import { postJSON,getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.5/api.js";
import {piggi} from "/daftar/img/svg.js";

if (getCookie("login")){
    getWithHeader("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),tokenFunction);
}else{
    redirect("/login");
}

function tokenFunction(result){
    console.log(result);
    setValue("nama",result.name);
    setValue("phone",result.phonenumber);
    if(result.email){
        setValue("email",result.email);
    }
    if(result.nik){
        setValue("nik",result.nik);
    }
    if(result.alamat){
        setValue("alamat",result.alamat);
    }
    if(result.pekerjaan){
        setValue("pekerjaan",result.pekerjaan);
    }
    
    onClick("submit",PostSignUp);
}



function PostSignUp(){
    let datainjson = {
        "nik":getValue("nik"),
        "pekerjaan":getValue("pekerjaan"),
        "alamat":getValue("alamat")
    }
    setInner("formsection",piggi);
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    if (result.status==200){
        redirect("./bio.html");
    }else{
        setInner("formsection",result.data.error);
    }
    
}