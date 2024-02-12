import {setInner, show,hide,getValue,getFileSize,onClick} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postFile} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";

onClick("savebutton",uploadImage)

function uploadImage() {
    if (!getValue("imageInput")) {
        alert('Please select an image file');
        return;
    }
    //hide("inputfile");
    let besar=getFileSize("imageInput");
    setInner("isi",besar);
    postFile('https://ped.fly.dev/auth/upload/image/profil',"imageInput","image",renderToHtml);
}

function renderToHtml(result){
    console.log(result);
    setInner("isi",result.content);
    show("inputfile");
}