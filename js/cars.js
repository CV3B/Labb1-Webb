document.addEventListener("DOMContentLoaded", (e) => {
    // fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/ford?format=json")
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error("API request failed.");
    //         }
    //     })
    //     .then(data => console.log(data))
    //     .catch(error => console.error("Fel vid anrop:", error));

    const url = "https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=ford";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Ford Models:", data);
    })
    .catch(error => console.error("Error fetching car models:", error));

    
})