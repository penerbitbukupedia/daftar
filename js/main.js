import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {onClick,getValue,setValue,setInner,addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.5/element.js";
import { postJSON,getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.5/api.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

await addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

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
    if(result.alamatrumah){
        setValue("alamatrumah",result.alamatrumah);
    }
    if(result.alamatkantor){
        setValue("alamatkantor",result.alamatkantor);
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
        "alamatrumah":getValue("alamatrumah"),
        "alamatkantor":getValue("alamatkantor")
    }
    // Tampilkan SweetAlert loading sebelum memulai upload
    Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while your file is being uploaded.',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading(); // Tampilkan loading indicator
        }
    });
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    // Tutup SweetAlert loading setelah upload selesai
    Swal.close();
    if (result.status==200){
        Swal.fire('Success', 'Data user berhasil tersimpan!', 'success');
        redirect("./bio.html");
    }else{
        Swal.fire(result.data.status, result.data.response, 'error');
    }
    
}
