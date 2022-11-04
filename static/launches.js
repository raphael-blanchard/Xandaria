async function launches() {

  launches_url ="https://ll.thespacedevs.com/2.0.0/launch/upcoming/?format=json&limit=10";
  const response = await fetch(launches_url);
  const data = await response.json();
  const list_launches = data["results"];

  console.log(list_launches);
  //console.log(final_launches);

  for (let i = 0; i < list_launches.length; i++) {
    const image_src = list_launches[i]["image"];
    console.log(image_src);

    // create div element
    let divElement = document.createElement('div')
    divElement.id = 'launches';
    document.body.children[2].appendChild(divElement);

    
    const name = list_launches[i]["name"];
    const company_name = list_launches[i]["launch_service_provider"]["name"];
    const pad_location = list_launches[i]["pad"]["name"];
    let description_API;
    if (list_launches[i]['mission'] != null) {
      description_API = list_launches[i]['mission']['description'];
    }
    else {
      description_API = "Nothing to display.";
    }
    console.log(description_API);
    const go_tbd_success = list_launches[i]['status']['name'];

    const launch_time = list_launches[i]["net"];
    const launch_time_formatted = launch_time[5] + launch_time[6] + '/' + launch_time[8] + launch_time[9] +
     '/' + launch_time[0] + launch_time[1] + launch_time[2] + launch_time[3] + '-' + launch_time[11] + launch_time[12] +
      launch_time[13] + launch_time[14] + launch_time[15] + launch_time[16] + launch_time[17] + launch_time[18] + ' ' + 'UTC+0';

    //create a row for each astronaut and adding the id and class to style it
    let row = document.createElement('div');
    row.id = 'launch_rows';
    row.className = 'row align-items-center';
    //append row to the divElement created at the beginning of the script
    divElement.appendChild(row);

    //create a first column and adding a class to style it
    let col1 = document.createElement('div');
    col1.className = 'col-sm-6';
    let image_rocket = document.createElement('img');
    image_rocket.id = 'image_rocket';
    image_rocket.className = 'countdown_items';
    //putting the src after
    col1.appendChild(image_rocket);
    let description_button = document.createElement('a');
    description_button.className = 'button_test';
    //putting the innerHTML later
    col1.appendChild(description_button);
    row.appendChild(col1);

    let col2 = document.createElement('div');
    col2.className = 'col-sm-6';
    let rocket_name = document.createElement('h4');
    rocket_name.id = 'rocket_name';
    rocket_name.className ='countdown_items';
    rocket_name.innerHTML = name;
    let company = document.createElement('h6');
    company.id = 'company_pad';
    company.className = 'countdown_items';
    company.innerHTML = company_name;
    let pad = document.createElement('h6');
    pad.id = 'company_pad';
    pad.className = 'countdown_items';
    pad.innerHTML = pad_location;
    let countdown = document.createElement('h1');
    countdown.id = 'countdown';
    countdown.className = 'countdown_items';
    countdown.innerHTML = 'T- 00 : 00 : 00 : 00';
    let date_launch = document.createElement('h6');
    date_launch.id = 'date';
    date_launch.className = 'countdown_items';
    date_launch.innerHTML = launch_time_formatted
    let status_column = document.createElement('div');
    status_column.id = 'status_column';
    let status = document.createElement('a');
    if (go_tbd_success == 'Success') {
      status.className = 'success';
    }
    else if (go_tbd_success == 'Go') {
      status.className = 'go';
    }
    else {
      status.className = 'tbd';
    }
    status.innerHTML = go_tbd_success;

    if (image_src == null) {
      continue
    }
    description_button.innerHTML = 'DESCRIPTION';
    image_rocket.src = image_src;

    //listen to the different buttons
    const element = document.querySelectorAll(".button_test");
    element[i].addEventListener("mouseover", event => {
      description_button.innerHTML = description_API;
    });

    element[i].addEventListener("mouseout", event => {
      description_button.innerHTML = 'DESCRIPTION';
    });

    //insert other stuff
    //
    //
    col2.appendChild(rocket_name);
    col2.appendChild(company);
    col2.appendChild(pad);
    col2.appendChild(countdown);
    col2.appendChild(date_launch);
    status_column.appendChild(status)
    col2.appendChild(status_column);

    row.appendChild(col2);

    async function countdown_function() {
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var dateTime_parsed = Date.parse(dateTime);
      //console.log(dateTime);

      var launch_time_parsed = Date.parse(launch_time);
      //console.log(launch_time_parsed);
      var difference = (launch_time_parsed - dateTime_parsed)/1000;
      //console.log(difference);

      function secondsToDhms(seconds) {
          seconds = Number(seconds);
          var d = Math.floor(seconds / (3600*24));
          var h = Math.floor(seconds % (3600*24) / 3600);
          var m = Math.floor(seconds % 3600 / 60);
          var s = Math.floor(seconds % 60);

          if (d >= 0 && d < 10) {
            dDisplay = 'T' + '-' + ' ' + '0' + d + ' ' + ':' + ' ';
          }
          else {
            dDisplay = 'T' + '-' + ' ' + d + ' ' + ':' + ' ';
          }

          if (h >= 0 && h < 10) {
            hDisplay = '0' + h + ' ' + ':' + ' ';
          }
          else {
            hDisplay = h + ' ' + ':' + ' ';
          }

          if (m >= 0 && m < 10) {
            mDisplay = '0' + m + ' ' + ':' + ' ';
          }
          else {
            mDisplay = m + ' ' + ':' + ' ';
          }

          if (s >= 0 && s < 10) {
            sDisplay = '0' + s;
          }
          else {
            sDisplay = s;
          }

          var countdown_display = '';
          if (d < 0 || h < -1 || m < 0 || s < 0) {
            countdown_display = 'ALREADY LIFTED OFF'
          }
          else {
            countdown_display = dDisplay + hDisplay + mDisplay + sDisplay;
          }
          return countdown_display;
        }
      const countdown_final = secondsToDhms(difference);
      //console.log(countdown_final);
      countdown.innerHTML = countdown_final;
      }
    //update the countdown each second
    setInterval(countdown_function, 1000);
  }


}



launches();

