document.querySelector(".busca").addEventListener("submit", async (event) => {
    // Previne o comportamento padrão do formulário;
    // Não deixa que o formulario envie;
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if (input != "") {
        clearInfo();
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ffc5ca632021a8f4d01faa9a06e911e4&units=metric&lang=pt_br`

        let result = await fetch(url);
        let json = await result.json();

            console.log(url);
        if (json.cod === 200) {
            showInfo({
                nome: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempicon: json.weather[0].icon,
                windspeed: json.wind.speed,
                windangle: json.wind.deg
            });
        } else {

            clearInfo();
            showWarning("Não encontramos esta localização.");
        }
    }else{
        clearInfo();
    }





});


function showInfo(json) {
    showWarning(" ");

    document.querySelector(".titulo").innerHTML = `${json.nome}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windspeed} <span>km/h</span>`;

    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempicon}@2x.png`)  

    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windangle - 90}deg)`

    document.querySelector(".resultado").style.display = "block";
}

function clearInfo(){
    showWarning("");
    document.querySelector(".resultado").style.display = "none";
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}