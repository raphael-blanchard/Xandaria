// create div element
let divElement = document.createElement('div')
divElement.id = 'astronauts';
document.body.children[2].appendChild(divElement);

//function to get the currently in mission astronauts, then display their profile
async function astronauts() {
    const astronauts = []
    const astronaut_list1 = {"people": [{"name": "Mark Vande Hei", "craft": "ISS"}, {"name": "Oleg Novitskiy", "craft": "ISS"}, {"name": "Pyotr Dubrov", "craft": "ISS"}, {"name": "Thomas Pesquet", "craft": "ISS"}, {"name": "Megan McArthur", "craft": "ISS"}, {"name": "Shane Kimbrough", "craft": "ISS"}, {"name": "Akihiko Hoshide", "craft": "ISS"}, {"name": "Nie Haisheng", "craft": "Tiangong"}, {"name": "Liu Boming", "craft": "Tiangong"}, {"name": "Tang Hongbo", "craft": "Tiangong"}], "number": 10, "message": "success"};
    const astronaut_list = astronaut_list1['people'];
    for (let i = 0; i < astronaut_list.length; i++) {
        if (astronaut_list[i]["craft"] == "ISS") {
            if (astronaut_list[i]["name"] == "Shane Kimbrough") {
                astronauts[i] = "Kimbrough";
            }
            else {
                astronauts[i] = astronaut_list[i]["name"];
            }
        }
    }
    astronauts.reverse();
    console.log(astronauts);
    for (let i = 0; i < astronauts.length; i++) {
        //making the url dynamically for each astronaut
        const base_url = "https://lldev.thespacedevs.com/2.2.0/astronaut/?format=json&search=";
        const name_url = astronauts[i];
        const final_url = base_url + name_url;
        //getting the json data from the API
        const response2 = await fetch(final_url);
        const data2 = await response2.json();
        const data_result = data2["results"];
        //get the data of each astronaut
        const name = data_result[0]["name"];
        const description = data_result[0]["bio"]
        const picture = data_result[0]["profile_image"];

        //create a row for each astronaut and adding the id and class to style it
        let row = document.createElement('div');
        row.id = 'astronaut_rows';
        row.className = 'row align-items-center';
        //append row to the divElement created at the beginning of the script
        divElement.appendChild(row);
        //create a first column and adding a class to style it
        let col1 = document.createElement('div');
        col1.className = 'col-sm-6';
        //creating what will later be appended to the column, here, the name of the astronaut and it's bio
        let name_astronaut = document.createElement('h4')
        name_astronaut.id = 'name';
        name_astronaut.innerHTML = name;
        let bio = document.createElement('p');
        bio.innerHTML = description;
        //appending the content bio and name to the column
        col1.appendChild(name_astronaut);
        col1.appendChild(bio);
        //appending the column to the row
        row.appendChild(col1);

        //same procedure but this time only for the picture of the astronaut
        let col2 = document.createElement('div');
        col2.className = 'col-sm-6';
        let img = document.createElement('img');
        img.id = 'profile_pic';
        img.src = picture;
        col2.appendChild(img);
        row.appendChild(col2);


    }
    //console.log(astronauts);

}
astronauts();