'use strict';

const apiKey = 'DIGuAJYTOoMSiF7gTaRoButwOugECo6aYyp9A9l1';
const parksURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getNationalParks(stateCodes,maxResults){
    const params = {
      stateCode: stateCodes,
      limit: maxResults,
      api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = parksURL + '?' + queryString;

    console.log(url);
  
    //this doesn't work...CORS issue
    /*const options = {
        headers: new Headers({
          "X-Api-Key": apiKey
        })
      };

      options.headers.append("Access-Control-Allow-Origin", "*");*/

    fetch(url /*,options*/)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        displayResults(responseJson);
    })
    .catch(error => {
        $('.results').html(`<p>Something went wrong: ${error.message}</p>`);
    });
                
}

function displayResults(responseJson){
    let htmlString = '';

    for( let i = 0; i < responseJson.data.length; i++){
        htmlString += `<li>
                            <p>${responseJson.data[i].fullName}</p>
                            <p>${responseJson.data[i].description}</p>
                            <p>Website: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
                        </li>`;
    }

    $('.results').html(htmlString);
}


function handleFormSubmit(){
    $('form').submit(function(event){
        event.preventDefault();
        let stateCodes = $('input[type=text]').val();        
        let maxResults = $('input[type=number]').val();

        getNationalParks(stateCodes,maxResults);
    });
}


function setup(){
    handleFormSubmit();
}

$(setup());
