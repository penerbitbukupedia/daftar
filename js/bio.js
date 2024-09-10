import {postFileJSON,getWithHeader,postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.6/api.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import { addCSS,setInner,getValue,onClick,onChange } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.5/element.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

await addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

if (getCookie("login")){
    getWithHeader("https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user","login",getCookie("login"),tokenFunction);
}else{
    redirect("/");
}

function tokenFunction(result){
    if(!result.phonenumber){
        redirect("/");
    }else{
        onClick("savebutton",uploadImage);
        onChange("imageInput",onchangeInputProfPic);
        onClick("publishbutton",publishBio);
        //renderProfPic(result.profpic);
    }
}

function onchangeInputProfPic(){
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
        setInner('ket1','Dipilih file: ');
        setInner('ket2',imageInput.files[0].name);
        setInner('ket3','Tekan upload untuk melakukan upload');
      } 
}

function publishBio(){
    const publishbutton = document.getElementById('publishbutton');
    publishbutton.disabled=true;
    publishbutton.classList.add('opacity-50', 'cursor-not-allowed');
    let biovalue=getValue('bio');
    console.log(biovalue);
    let datajson={bio:biovalue};
    console.log('sekarang print isi jsonnya');
    console.log(datajson);
    postJSON('https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/data/user/bio',"login",getCookie("login"),datajson,runafterPostBio);
}

function runafterPostBio(result){
    console.log(result);
    if (result.status!==200){
        Swal.fire({
            icon: "error",
            title: result.data.status,
            text: result.data.response,
          });
    }
    
}


function uploadImage() {
    if (!getValue("imageInput")) {
        Swal.fire({
            icon: "error",
            title: "File tidak ada",
            text: "Silahkan pilih file yang akan dijadikan profile penulis dahulu",
          });
    }
    const saveButton = document.getElementById('savebutton');

    // Menonaktifkan tombol
    saveButton.disabled = true;

    // Menambahkan kelas untuk mengubah tampilan tombol ketika dinonaktifkan (opsional)
    saveButton.classList.add('opacity-50', 'cursor-not-allowed');

    postFileJSON('https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/upload/profpic',"login",getCookie("login"),"imageInput","profpic",renderToHtml)
}

function renderToHtml(result){
    console.log(result);
    if (result.status!==200){
        Swal.fire({
            icon: "error",
            title: result.data.status,
            text: result.data.response,
          });
    }else{
        renderProfPic(result.data.location);
    }
    
}

function renderProfPic(imageurl){
    const uploadPreview = document.getElementById('uploadPreview');
    // Buat elemen img dengan src dari file yang diunggah
    const imgElement = document.createElement('img');
    imgElement.src = imageurl;
    imgElement.alt = "Uploaded Image";
    imgElement.classList.add("w-full", "h-full", "object-contain", "rounded-lg");

    // Hapus konten dalam div sebelum menampilkan gambar
    uploadPreview.innerHTML = '';
    uploadPreview.appendChild(imgElement);
}