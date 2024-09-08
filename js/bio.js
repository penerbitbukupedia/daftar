import {setInner,getValue,onClick,onChange} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
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
        console.log(result);
        //setValue("phone",result.phone);
        onClick("savebutton",uploadImage);
        onChange("imageInput",onchangeInputProfPic);
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



function uploadImage() {
    if (!getValue("imageInput")) {
        alert('Please select an image file');
        return;
    }
    const saveButton = document.getElementById('savebutton');

    // Menonaktifkan tombol
    saveButton.disabled = true;

    // Menambahkan kelas untuk mengubah tampilan tombol ketika dinonaktifkan (opsional)
    saveButton.classList.add('opacity-50', 'cursor-not-allowed');

    postFileWithHeader('https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/upload/profpic',"login",getCookie("login"),"imageInput","profpic",renderToHtml)
}

function renderToHtml(result){
    console.log(result);
    renderProfPic(result.location);
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