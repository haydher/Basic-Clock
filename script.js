// cookie policy 
let allowCookies;
// check if user has already selected cookie policy
checkCookieAllow();
function checkCookieAllow(){
  let allCookies = document.cookie.split('; '); 
  for (let i = 0; i < allCookies.length; i++){ 
    let cookieType = allCookies[i].slice(0, allCookies[i].lastIndexOf("="))
    if(cookieType === "allowCookies"){
      let cookie = allCookies[i].slice(allCookies[i].lastIndexOf('=') + 1);
      
      if(cookie === "true")
        allowCookies = true;
      else 
        allowCookies = false;
    }
  }
}

// pop up and cookie policy
const popUp = document.querySelector(".popUp")
const cookieAccept = document.querySelector("#accept")
const cookieDecline = document.querySelector("#dontAccept")
const readMoreBtn = document.querySelector(".readMore")
const moreInfo = document.querySelectorAll(".moreInfo")

// if cookies showed already then dont show again
if(allowCookies === true || allowCookies === false ){
  popUp.style.display = "none";
}
// more info
readMoreBtn.addEventListener("click", ()=>{
  if(readMoreBtn.innerHTML == " Read more.")
    readMoreBtn.textContent = " Read less."
  else 
    readMoreBtn.textContent = " Read more."

  moreInfo.forEach(click => {
    click.classList.toggle("moreInfoHide")
   
  });
})

cookieAccept.addEventListener("click", ()=>{
  popUp.style.display  = "none";
  allowCookies = true;
  document.cookie = "allowCookies=true";
})
cookieDecline.addEventListener("click", ()=>{
  popUp.style.display  = "none";
  allowCookies = false;
  document.cookie = "allowCookies=false";
})


// start of code

const analogClock = document.querySelector(".clock")
const hourAnl = document.querySelector(".hourTick")
const minutesAnl = document.querySelector(".minTick")
const secondsAnl = document.querySelector(".secTick")


const digitalClock = document.querySelector(".digital")
const hourDig = document.querySelector(".digital-hour")
const minutesDig = document.querySelector(".digital-minutes")
const secondsDig = document.querySelector(".digital-seconds")
const amPm = document.querySelector(".am-pm")

const analogBtn = document.querySelector("#analogBtn")
const digitalBtn = document.querySelector("#digitalBtn")

const hour24 = document.querySelector("#hour24")
const hour12 = document.querySelector("#hour12")

let clockType = "analog";
// false = 24 hour
// true = 12 hour
let timeChange = false;

// initalizing the clocks
clock();
setInterval(()=>{
  clock();
},1000)

// if clicked on analog clock 
analogBtn.addEventListener("click", ()=>{
  selectedClock("analog");
})
// if clicked on digital clock
digitalBtn.addEventListener("click", ()=>{
  selectedClock("digital");
})

// type of time
hour24.addEventListener("click", ()=>{
  timeChange = false;
  checkSelectedBtn(timeChange)
  // if cookies allowed then save preference
  if(allowCookies === true){
    document.cookie = "timeChange=false";
  }
})

hour12.addEventListener("click", ()=>{
  timeChange = true;
  checkSelectedBtn(timeChange)
  if(allowCookies === true){
    document.cookie = "timeChange=true";
  }
})

function clock(){
  const date = new Date();
  
  const getMin = date.getMinutes();
  const getSec = date.getSeconds(); 

  let getHour = date.getHours();
  
  analog(getHour, getMin, getSec);

  digital(hourChange(getHour), getMin, getSec)

}

function analog(getHour, getMin, getSec){

  // convert the 24 hours to 12 hour
  getHour  = (getHour + 11) % 12 + 1;
  // add the mins to the hour tick
  getHour += (getMin * 6)/360;

  hourAnl.style.transform = `rotate(${(getHour * 30)}deg)`
  minutesAnl.style.transform = `rotate(${getMin * 6}deg)`
  secondsAnl.style.transform = `rotate(${getSec * 6}deg)`

}

function digital(getHour, getMin, getSec){
  
  hourDig.textContent = getHour + ":";
  minutesDig.textContent = getMin + ":";
  secondsDig.textContent = getSec;

}

function hourChange(getHour){
  let checkAM = new Date().getHours();
  if(timeChange == true){
    
    if(checkAM <12)
      amPm.textContent = " AM"
  
    else 
      amPm.textContent = " PM"
    
    return (getHour + 11) % 12 + 1;;
  }
 
  amPm.textContent = ""
  return getHour;
}

readCookieType();
function readCookieType(){
  if(allowCookies === true){
    let allCookies = document.cookie.split('; '); 

    for (let i = 0; i < allCookies.length; i++){ 

      let cookieType = allCookies[i].slice(0, allCookies[i].lastIndexOf("="))

      switch(cookieType){
        case "clockType":
          readClockType(allCookies[i])
          break;

        case "timeChange":
          readTimeType(allCookies[i])
          break;
      }
    }
  }
}


function readClockType(allCookies){
  let cookie = allCookies.slice(allCookies.lastIndexOf('=') + 1);

  if(cookie === "analog"){
    clockType = "analog";
    selectedClock(clockType)
  } else if(cookie === "digital") {
    clockType = "digital";
    selectedClock(clockType)
  }
}

function readTimeType(allCookies){
  let cookie = allCookies.slice(allCookies.lastIndexOf('=') + 1);

  if(cookie === "true"){
    timeChange = true;
  } else if(cookie === "false") {
    timeChange = false;
  }
}


function selectedClock(clockType = "analog"){

  if(clockType === "digital"){
    if(!analogClock.classList.contains("invisible")){
    
      digitalClock.classList.remove("invisible")
      analogClock.classList.add("invisible")
  
      digitalBtn.classList.add("buttonBorder")
      analogBtn.classList.remove("buttonBorder")
      
      if(allowCookies === true){
        document.cookie = "clockType=digital";
      }
    }
  } else if(clockType === "analog"){
    if(!digitalClock.classList.contains("invisible")){
      analogClock.classList.remove("invisible")
      digitalClock.classList.add("invisible")
  
      analogBtn.classList.add("buttonBorder")
      digitalBtn.classList.remove("buttonBorder")

      if(allowCookies === true){
        document.cookie = "clockType=analog";
      }

    }
  }
}

checkSelectedBtn();
function checkSelectedBtn(){
  if(timeChange === false){
    
    hour24.classList.add("btnSelected");
    hour12.classList.remove("btnSelected");

  } else if(timeChange === true){
    
    hour12.classList.add("btnSelected");
    hour24.classList.remove("btnSelected");
  
  }
}

eraseCookie(document.cookie)
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=0'
}

function checkCookie() { 
  let allCookies = document.cookie.split(';'); 
  for (let i = 0; i < allCookies.length; i++){ 
    console.log(allCookies[i])
  }

}


// delete cookie
// function eraseCookie(name) {
//   document.cookie = name + '=; Max-Age=0'
//   console.log('cookie deleted',name)
// }

