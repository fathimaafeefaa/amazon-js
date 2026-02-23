const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log(xhr.response)
});
xhr.open("GET", "https://supersimplebackend.dev/images/apple.jpg");
xhr.send();

export async function xhr(){
    const response=await fetch("https://supersimplebackend.dev/images/apple.jpg");
    const blob=await response.blob();
    console.log(blob);
}