import {setInner, show,hide,getValue,getFileSize,onClick} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postFileWithHeader,getWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";

if (getCookie("login")){
    getWithHeader("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),tokenFunction);
}else{
    redirect("/");
}

function tokenFunction(result){
    if(!result.phonenumber){
        redirect("/");
    }else{
        console.log(result.phonenumber);
        //setValue("phone",result.phone);
        onClick("savebutton",uploadImage)
    }
}



function uploadImage() {
    if (!getValue("imageInput")) {
        alert('Please select an image file');
        return;
    }
    //hide("inputfile");
    let besar=getFileSize("imageInput");
    setInner("isi",besar);
    postFileWithHeader('https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/upload/profpic',"login",getCookie("login"),"imageInput","profpic",renderToHtml)
}

function renderToHtml(result){
    console.log(result);
    setInner("isi",result.content);
    show("inputfile");
}