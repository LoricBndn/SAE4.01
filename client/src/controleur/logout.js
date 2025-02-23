let cookieString = document.cookie;
let cookies = cookieString.split("; ");
  
for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    const name = decodeURIComponent(parts[0]);
  
    const expires = new Date();
    expires.setTime(expires.getTime() - 1);
  
    document.cookie = `${name}=;expires=${expires.toUTCString()};path=/`;
}
// console.log(" Test affi cookie : " +document.cookie);
window.location.href = 'accueil.html';