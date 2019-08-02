



let weatherForm = document.querySelector('form');
let searchElement = document.querySelector('input')
let errorParagraph = document.querySelector('#errorParagraph');
let locationParagraph = document.querySelector("#locationParagraph");
let forecastParagraph = document.querySelector("#forecastParagraph");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = searchElement.value;
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            errorParagraph.textContent = data.error;
            locationParagraph.textContent ='';
            forecastParagraph.textContent = '';
        }else{
            console.log(data.location);
            errorParagraph.textContent = '';
            locationParagraph.textContent = data.location;
            forecastParagraph.textContent = data.forecast;

            console.log(data.forecast);
        }
    })
})
})

