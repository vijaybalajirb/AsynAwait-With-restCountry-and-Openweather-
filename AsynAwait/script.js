//Function
function createElement(ele){
    return document.createElement(ele)
}

function childAppend(ele,child){
    return ele.appendChild(child)
}

function append(ele){
    return document.body.append(ele)
}

function setAttribute(ele,attribute,value){
    return ele.setAttribute(attribute,value)
}

//Api-Sources
//c6623f165181fcc12d0cc18236518daf
restCountryApi='https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json'

function weatherReqData(lat, lng) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c6623f165181fcc12d0cc18236518daf&units=metric`;
  };

//Asyn---Await part

async function getRestCountriesData(){
try {
    let req=await fetch(restCountryApi)
    let data=await req.json();
    displayJsonData(data)

} catch(error){
    console.log(error)
}
}

async function getWeatherData(lat,lng,id)
{
    try{
        let req=await fetch(weatherReqData(lat,lng))
        let data=await req.json()
        let weatherDiv =document.getElementById(`country${id}`)
        weatherDiv.innerHTML=`<br><b>Weather</b> : ${data.weather[0].description}<br>
        <b>Temperature</b> : ${data.main.temp} C,<br> <b>Feels like:</b> ${data.main.feels_like} C`;
    }catch{
        console.log(error)
    }
}

getRestCountriesData()

//Display in htmlPage

function displayJsonData(data){
    let row=document.getElementById("Main")

    for(i=0;i<data.length;i++){
        let card=createElement('div');
        setAttribute(card,'class','card-body col-3')
        childAppend(row,card);

    let countryName=createElement('h6')
    countryName.innerText=data[i].name;
    childAppend(card,countryName)

    let flag=createElement('img')
    flag.src=data[i].flag;
    setAttribute(flag,'class','card-img-top')
    childAppend(card,flag)

    let capital=createElement("div")
    childAppend(card,capital)

    let capitalLabel = createElement('span');
    capitalLabel.innerText = 'Capital: ';
    childAppend(capital, capitalLabel);

    let capitalName = createElement('span');
    capitalName.innerText = data[i].capital;
    childAppend(capital, capitalName);

    let region = createElement("div")
    region.innerText="Region: "
    childAppend(card,region)

    let regionDisplay=createElement("span")
    regionDisplay.innerText=data[i].region;
    childAppend(region,regionDisplay)
    
    let countryCode=createElement("div")
    childAppend(card,countryCode)

    let countryCodeLabel=createElement("span")
    countryCodeLabel.innerText="Code: "
    childAppend(countryCode,countryCodeLabel)

    let countryCodeData=createElement("span")
    countryCodeData.innerText=`${data[i].alpha2Code},${data[i].alpha3Code}`
    childAppend(countryCode,countryCodeData)

    let weatherBtn= createElement("button")
    setAttribute(weatherBtn,'type',"button")
    setAttribute(weatherBtn, 'class', 'btn btn-primary text-center');
    weatherBtn.innerText = 'Click for Weather';
    setAttribute(weatherBtn, 'onclick', `getWeatherData(${data[i].latlng[0]},${data[i].latlng[1]},${i})`);
    childAppend(card, weatherBtn);

    let weatherDiv = createElement('i');
    setAttribute(weatherDiv, 'id', `country${i}`);
    card.appendChild(weatherDiv);


}
}

