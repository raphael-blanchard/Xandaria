async function imageday() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=TqJsJykSnmgf5rfeogtq58aAqWN1QIsDzBSxQ4zE";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.url);
    document.getElementById("picture").setAttribute("src",data.url);
    document.getElementById("link").setAttribute("href",data.url);
    document.getElementById("explanation").innerHTML = data.explanation;
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("title_author").innerHTML = data.title + ',' + ' ' + data.copyright + '.';
    }

    imageday();