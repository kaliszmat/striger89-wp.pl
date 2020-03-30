let windowY = window.screen.height;
const body = document.querySelector('body')
const navCnt = document.querySelector('.nav-container');
const toggler = navCnt.querySelector('.toggler')
const menu = navCnt.querySelector('.menu')
const media = window.matchMedia('(max-device-width: 1000px)')

function fixMenuBgHeight(){
    menu.style.height = `${body.scrollHeight}px`;
}
if(media.matches){
    navCnt.classList.add('mobile-menu');
    fixMenuBgHeight()
}
else{
    navCnt.classList.remove('mobile-menu');
    navCnt.classList.add('desktop-menu')
    toggler.style.display = 'none';
}





console.log(body.scrollHeight)