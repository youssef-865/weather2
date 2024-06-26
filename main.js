const myApi = `92bd21f6bd254f54bc6123829241706`;
const BaseApi = `http://api.weatherapi.com/v1/forecast.json`;
let search = document.getElementById("search");

search.addEventListener("change", function () {
  getWeather(search.value);
});
search.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getWeather(search.value);
  }
});

async function getWeather(country) {
  try {
    document.getElementById(
      "weatherCards"
    ).innerHTML = `<div class="lds-default d-flex justify-content-center align-items-center m-auto"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
   let response = await fetch(`https:api.weatherapi.com/v1/forecast.json?key=92bd21f6bd254f54bc6123829241706&q=30.911762,30.1718502&days=3`);

    let finalResponse = await response.json();
    console.log(finalResponse);
    displayWeather(finalResponse);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter ur location...!",
   
    });
 search.value = '';
 document.getElementById(
  "weatherCards"
).innerHTML = ''
  }
}

getWeather();

function displayWeather(data) {
  let dataArray = data.forecast.forecastday;
  console.log(dataArray);
  let weatherBox = ``;

  for (i = 0; i < dataArray.length; i++) {
    const date = new Date(dataArray[i].date);
    const weekday = date.toLocaleDateString("en-us", { weekday: "long" });
    // document.querySelector("#location").innerHTML = data.location.country;
    // document.querySelector(".today-weather").innerHTML = `
    //    <h1 class="cityame fw-bolder fs-3"></h1>
    //             <h2 class="cityame fw-bolder display-4"></h2>
    //             <p id="weatherCondition" class="fw-semibold fs-5"></p>

    //             <div class="d-flex align-items-center gap-3">
    //                 <p>
    //                     <img src="" width="30px" alt="">
    //                     <span id="rainProbablitiy" class="fw-semibold"></span>
    //                 </p>

    //             </div>
    // `;

    weatherBox += `
    
<div class="col-md-4">
    <div class="bg-black text-white p-3 rounded card-h ">
        <div class="today forecast">
            <div class="forecast-header d-flex justify-content-between header-class-sunny">
                <div class="day day-class-sunny">${weekday}</div>
                <div class="date">${dataArray[i].date}</div> 

               
            </div>
              <div class="date fw-bolder fs-3  text-center pt-3">${data.location.name}</div>
            <div class="forecast-content">
                <div class="location"></div>

                <div class="degree d-flex align-items-center flex-column">
                    <div class="forecast-icon py-2 m-2 
                    
                    ">
                        <img src="https://example.com/icon/sunny.png" alt="" width="50">
                    </div>
                    <div class='temp '>
                    ${dataArray[i].day.maxtemp_c} °C
                    </div>
                    <div class='temp'>
                    ${dataArray[i].day.mintemp_c} °C
                    </div>
                </div>
                <div class="daycondition p-2 sunny-condition text-center "> ${dataArray[i].day.condition.text}</div>  
                <div class="d-flex justify-content-center  mt-2  ">
                    <span>  <img src="${dataArray[i].day.condition.icon}" alt="" width="50"></span>
                   
                   
                </div>

                <div class="d-flex justify-content-between  ">
                     <span><img src="./images/icon-umberella.png" alt=""> %</span>
                     <span><img src="images/icon-wind.png" alt=""> ${dataArray[i].day.maxwind_kph} km/h</span>
                     <span><img src="images/icon-compass.png" alt=""> ${dataArray[i].day.condition.daily_chance_of_rain}</span>
                 </div>

                
            </div>
        </div>
    </div>
</div>

`;
  }

  document.getElementById("weatherCards").innerHTML = weatherBox;
}

function myCurrentLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let myCurrentPosition = `${latitude},${longitude}`;

  console.log(latitude, longitude);

  getWeather(myCurrentPosition);
}

navigator.geolocation.getCurrentPosition(myCurrentLocation);

