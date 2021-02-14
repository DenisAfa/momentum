const time = document.querySelector(".time");
const date = document.querySelector(".date")
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const btn = document.querySelector(".btn");
const btnQuote = document.querySelector(".btn__quote");
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");


// showTime
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// getImage
let dayTimes = ["morning", "day", "evening", "night"];
const base = 'assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
let dayTime


function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

let randomImages = shuffle(images)

function showTime() {
  
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let todayDate = today.getDate();
    let day = today.getDay();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

   time.innerHTML = `${hours}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;
   date.innerHTML = `${days[day]}<span>,</span> ${addZero(todayDate)} ${months[month]} ${year}` 

   setTimeout(showTime, 1000);

};

function addZero(n) {
    return ( parseInt(n, 10) < 10 ? "0" : "" ) + n;
};

function setBgGreet() {
    let today = new Date();
    let hour = today.getHours();

    if (hour >= 6 && hour <= 12) {
        dayTime = 0;
        greeting.textContent = "Good Morning,";
    } else if (hour > 12 && hour <= 18) {
        dayTime = 1;
        greeting.textContent = "Good Day,";
    } else if (hour > 18 && hour <= 24) {
        dayTime = 2;
        greeting.textContent = "Good Evening,";
    } else {
        dayTime = 3;
        document.body.style.color = "white";
        greeting.textContent = "Good Night,";
    }

    setTimeout(setBgGreet, 3600000);
};

function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = "[Enter name]";
    } else {
        name.textContent = localStorage.getItem("name");
    }
};

function startName() {
    if (name.textContent === "[Enter name]") {
        name.textContent =""
    } else if (name.textContent === "") {
        name.textContent ="[Enter name]"
    }
};

function setName(e) {
    if(e.type === "keypress") {
        if(e.code === 'Enter') {
            localStorage.setItem("name", e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem("name", e.target.innerText);
    }
};

function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = "[Enter focus]";
    } else {
        focus.textContent = localStorage.getItem("focus");
    }
};

function startFocus() {
    if (focus.textContent === "[Enter focus]") {
        focus.textContent =""
    } else if (focus.textContent === "") {
        focus.textContent ="[Enter focus]"
    }
};

function setFocus(e) {
    if(e.type === "keypress") {
        if(e.code === 'Enter') {
            localStorage.setItem("focus", e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem("focus", e.target.innerText);
    }
};

// change background image

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url(${src})`;
    }; 
  }

function getImage() {
    
    const index = i % randomImages.length;
    const imageSrc = base + dayTimes[dayTime] + "/" + randomImages[index];
    viewBgImage(imageSrc);
    i++;

    if (i % 6 === 0) {
        if (dayTime === 3) {
            dayTime = 0;
            i = 0;
        } else {
            dayTime++;
        }
    }

    setTimeout(getImage, 3600000);
} 

// Change quote
// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
};

// Weather

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=12cac606305234b80b9061866da46da3&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message === "city not found") {
        temperature.textContent = "city not found"
        weatherIcon.className = "";
        weatherIcon.classList.remove(`owf-${data.weather[0].id}`);
        humidity.textContent = "";
        weatherDescription.textContent = "";
        wind.textContent = "";
    } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C `;
    humidity.textContent = `humidity : ${data.main.humidity} %`
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `wind speed: ${data.wind.speed} m/s`
    }
};

function getCity() {
    if(localStorage.getItem('city') === null) {
        city.textContent = "[Enter city]";
    } else {
        city.textContent = localStorage.getItem("city");
    }
};

function startCity() {
    if (city.textContent === "[Enter city]") {
        city.textContent = ""
    } else if (city.textContent === "") {
        city.textContent ="[Enter city]"
    }
};

function setCity(e) {
    if(e.type === "keypress") {
        if(e.code === 'Enter') {
            localStorage.setItem("city", e.target.innerText);
            getWeather();
            city.blur();
        }
    } else {
        localStorage.setItem("city", e.target.innerText);
    }
};
  
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("focus", startName);
name.addEventListener("blur", startName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("focus", startFocus);
focus.addEventListener("blur", startFocus);
btn.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener("focus", startCity);
city.addEventListener("blur", startCity);

showTime();
setBgGreet();
getName();
getFocus();
getImage();
getWeather();
getCity();
