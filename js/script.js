const money = document.getElementById('money');
const bet = document.getElementById('bet');
const prize = document.getElementById('prize');
const doBet = document.getElementById('doBet');
const luck = document.getElementById('luck');
const windBet = document.forms.windBet;
const sumBet = windBet.elements.sumBet;
const divlog = document.getElementById('divlog');
const loginEnt = document.forms.loginEnt;
const login = loginEnt.elements.login;
const header = document.getElementById('header');
let loginUser = '';
let visitUserTime = '';
let loginUserT = header.firstElementChild;
let visitUserTimeT = header.lastElementChild;

let CookSesh = getCookie('userName');

if(CookSesh != 0){
    login.value = CookSesh;
    setCookdate();
}

loginEnt.addEventListener('submit', (event)=>{
    event.returnValue = false;
    setCookdate();
})

const imgs = ['images/pearl.gif', 'images/star-red.gif', 'images/star-magenta.gif', 'images/shell.gif', 'images/fish.gif', 'images/octopus.gif', 'images/shark.gif'];

const imgsLuck = document.querySelector('#luck>div').children;
const butLuck = document.querySelector('#luck>button');
const wins = [];

let count1 = 0;
let count2 = 1;
let count3 = 2;

let sum = 1000;
let sumBet1 = 0;
let sumWin = 0;
let coef;

doBet.addEventListener('click', (event)=>{
    event.preventDefault();
    if(sumBet1) return;
    windBet.style.display = 'block';
    let coordsDoBet = doBet.getBoundingClientRect();
    let windBetW = windBet.getBoundingClientRect().width;
    windBet.style.left = coordsDoBet.left+coordsDoBet.width-windBetW+'px';
    windBet.style.top = coordsDoBet.top + 'px';
    sumBet.focus();
})
windBet.addEventListener('keyup', (event)=>{
    if(event.code == 'Escape'){
        sumBet.value = '';
        bet.innerText = 0;
        windBet.style.display = 'none';
    }
})
butLuck.addEventListener('click', (event)=>{
    if(sumBet1 == 0) return;
    let interval1 = setInterval(doBlink, 100);
    setTimeout(() => {
        clearInterval(interval1);

        for (let i = 0; i < imgsLuck.length; i++) {
            wins[i] = Math.round(Math.random()*6);
            imgsLuck[i].src = imgs[wins[i]];
        }
     
        let winsStr = wins.join('');
   
        if(winsStr == 000) coef = 800;
        else if(winsStr == 666) coef = 200;
        else if(winsStr == 555) coef = 80;
        else if(winsStr == 444) coef = 40;
        else if(winsStr == 333) coef = 20;
        else if(/(1|2){3}/.test(winsStr)) coef = 10;  
        else if(/((1|2){2})|((1|2)\d(1|2))/.test(winsStr)) coef = 5;
        else if(/(1|2)/.test(winsStr)) coef = 2;
        else{
            sumBet1 = 0;
            bet.innerText = sumBet1;
            return;
        }
    
        sumWin = sumBet1 * coef;
        prize.innerText = sumWin;
        sumBet1 = 0;
        bet.innerText = sumBet1;
        sum = sum + sumWin;
        money.innerText = sum;

    }, 3000);
})
windBet.addEventListener('submit', (event)=>{
    event.returnValue = false;
    sumBet1 = sumBet.value;
    if(sumBet1<=sum && sumBet1 != 0){ 
        sum = sum-sumBet1;
        money.innerText = sum;
        bet.innerText = sumBet1;
        windBet.style.display = 'none';
        sumBet.value = '';
        sumWin = 0;
        prize.innerText = sumWin;
    }
})

function setCookdate(){
    let date = new Date();
    loginUser = login.value;

    login.value = '';
    let lastCook = getCookie(loginUser);
  
    if(lastCook != 0){
        visitUserTimeT.innerText = 'Вы последний раз играли: '+ lastCook;
    } 
        
    const d = [
        '0' + date.getDate(),
        '0' + (date.getMonth() + 1),
        '0' + date.getHours(),
        '0' + date.getMinutes(),
        '0' + date.getSeconds()
    ].map(item => item.slice(-2));
    visitUserTime = d.slice(0, 2).join(':') + ':' + date.getFullYear() + ', ' + d.slice(2).join(':');
   
    setCookie(loginUser,visitUserTime,30);
    setCookie('userName',loginUser);

    loginUserT.innerText = loginUser;
    divlog.style.display = 'none';
}

function doBlink(){
    count1 = (++count1) % imgs.length;
    count2 = (++count2) % imgs.length;
    count3 = (++count3) % imgs.length;
    
    imgsLuck[0].src = imgs[count1];
    imgsLuck[1].src = imgs[count2];
    imgsLuck[2].src = imgs[count3];
}

function setCookie(name,val,exp){
    let cook = name+'='+encodeURIComponent(val)+';SameSite=None; Secure;';
    if(exp){
        let date = new Date();
        date.setDate(date.getDate()+exp);
        cook += 'expires='+date.toUTCString();
    }
    document.cookie = cook;
}

function getCookie(name){
    let cook = document.cookie;
    let ptn = new RegExp('\\b'+name+'=','g');
    if(ptn.test(cook)){
        let val='';
        let pos1 = cook.indexOf('=',cook.search(ptn))+1;
        let pos2 = cook.indexOf(';',pos1);
        if(pos2==-1){
            val = cook.slice(pos1);
        }
        else{
            val = cook.slice(pos1,pos2);
        }
        return decodeURIComponent(val);
    }
    return '';
}