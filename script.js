// Saraswati Puja poster generator. Export dimensions are exactly 1080 x 1920.
const W=1080,H=1920;
const TEMPLATE="poster-template.jpg";
const canvas=document.getElementById("poster"),ctx=canvas.getContext("2d");
const form=document.getElementById("form"),nameField=document.getElementById("name");
const designationField=document.getElementById("designation"),logoField=document.getElementById("logo");
const status=document.getElementById("status"),error=document.getElementById("error");
const download=document.getElementById("download");
canvas.width=W;canvas.height=H;

const template=new Image();let templateReady=false,logo=null,generated=false;
function showError(s){error.textContent=s;error.classList.remove("hidden")}
function clearError(){error.textContent="";error.classList.add("hidden")}
function placeholder(){
 ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);ctx.fillStyle="#555";ctx.textAlign="center";
 ctx.font="bold 34px Arial";ctx.fillText("Add poster-template.png",W/2,H/2-20);
 ctx.font="22px Arial";ctx.fillText("Your Saraswati Puja poster will appear here",W/2,H/2+24);
}
function drawBase(){
 // Fit the provided 9:16 poster to the 1080x1920 canvas.
 const scale=Math.max(W/template.naturalWidth,H/template.naturalHeight);
 const w=template.naturalWidth*scale,h=template.naturalHeight*scale;
 ctx.clearRect(0,0,W,H);ctx.drawImage(template,(W-w)/2,(H-h)/2,w,h);
}
function drawLogo(img){
 // Top "Photo" placeholder from the supplied example; logo is centered there.
 // Adjust these values if your template's logo area differs.
 const box={x:W*.34,y:H*.055,w:W*.32,h:H*.085};
 const scale=Math.min(box.w/img.naturalWidth,box.h/img.naturalHeight);
 const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
 ctx.drawImage(img,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h);
}
function fittedSize(text,base,min,maxWidth,fontWeight="700",family="Arial"){
 let size=base;
 ctx.font=`${fontWeight} ${size}px ${family}`;
 while(ctx.measureText(text).width>maxWidth&&size>min){size-=1;ctx.font=`${fontWeight} ${size}px ${family}`}
 return size;
}
function drawPersonalization(name, designation) {
  ctx.save();

  // Clear the incorrectly positioned text
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, H * 0.692, W, H * 0.100);

  // Clear the original Placeholder and designation text
  // without covering the decorative separators
  ctx.fillRect(0, H * 0.810, W, H * 0.072);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Name: move down into the bottom section
  const nameSize = fittedSize(name, 56, 27, W * 0.78, "700", "Arial");
  ctx.font = `700 ${nameSize}px Arial, Helvetica, sans-serif`;
  ctx.fillStyle = "#3b3b3b";
  ctx.fillText(name, W * 0.5, H * 0.836, W * 0.78);

  // Designation: directly below the name
  const desSize = fittedSize(designation, 31, 20, W * 0.78, "400", "Arial");
  ctx.font = `400 ${desSize}px Arial, Helvetica, sans-serif`;
  ctx.fillText(designation, W * 0.5, H * 0.863, W * 0.78)
  ctx.restore();
}
function render(){
 if(!templateReady){showError("Poster template is missing. Add poster-template.png beside index.html and refresh.");return}
 const name=nameField.value.trim(),designation=designationField.value.trim();
 if(!name||!designation){showError("Please enter both name and designation.");return}
 clearError();drawBase();if(logo)drawLogo(logo);drawPersonalization(name,designation);
 generated=true;download.disabled=false;status.textContent="• Preview ready";
}
template.onload=()=>{templateReady=true;drawBase();status.textContent="• Template loaded"};
template.onerror=()=>{templateReady=false;placeholder();status.textContent="• Template not loaded"};
template.src=TEMPLATE;
placeholder();

logoField.addEventListener("change",()=>{
 logo=null;const file=logoField.files&&logoField.files[0];if(!file){if(generated)render();return}
 if(!file.type.startsWith("image/")){showError("Please select an image file.");logoField.value="";return}
 const reader=new FileReader();
 reader.onload=()=>{const img=new Image();img.onload=()=>{logo=img;if(generated)render()};img.onerror=()=>showError("Could not open that logo.");img.src=reader.result};
 reader.onerror=()=>showError("Could not read that logo.");reader.readAsDataURL(file);
});
form.addEventListener("submit",e=>{e.preventDefault();render()});
[nameField,designationField].forEach(el=>el.addEventListener("input",()=>{if(generated)render()}));
document.getElementById("reset").addEventListener("click",()=>{
 form.reset();logo=null;generated=false;download.disabled=true;clearError();
 if(templateReady)drawBase();else placeholder();status.textContent=templateReady?"• Template loaded":"• Template not loaded";
});
download.addEventListener("click",()=>{
 if(!generated)return;
 canvas.toBlob(blob=>{
  if(!blob){showError("PNG export failed. Please try another browser.");return}
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  const safe=(nameField.value.trim()||"saraswati-puja").replace(/[^a-z0-9_-]+/gi,"-");
  a.href=url;a.download=`${safe}-saraswati-puja-1080x1920.png`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
 },"image/png");
});
