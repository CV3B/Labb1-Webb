document.addEventListener("DOMContentLoaded", (e) => {
  let f1Year = document.getElementById("f1Year");
  let selectedDriver = document.getElementById("selectedDriver");

  f1Year.addEventListener("change", () => {
    fetch(`https://ergast.com/api/f1/${f1Year.value}/drivers.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed.");
        }
      })
      .then((data) => {
        let drivers = data.MRData.DriverTable.Drivers;

        selectedDriver.innerHTML = "";

        drivers.forEach((driver) => {
          let option = document.createElement("option");
          option.value = driver.driverId;
          option.textContent = `${driver.givenName} ${driver.familyName}`;

          selectedDriver.appendChild(option);
        });
        console.log(drivers);
      })
      .catch((error) => console.error("Fel vid anrop:", error));
  });

  selectedDriver.addEventListener("click", () => {
    fetch(
      `https://ergast.com/api/f1/${f1Year.value}/drivers/${selectedDriver.value}/results.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed.");
        }
      })
      .then((data) => {
        let driverInfo = document.getElementById("driverInfo");
        let races = data.MRData.RaceTable.Races;
        console.log(data);

        driverInfo.innerHTML = "";

        if (!selectedDriver.value) return;

        races.forEach((race) => {
          let p = document.createElement("p");
          p.innerHTML = `
                                <h5 class="textColor">${race.raceName} - Round ${race.round}</h5>
                                <p class="text-white"><strong>Position:</strong> <span >${race.Results[0].position}</span></p>
                                <p class="text-white"><strong>Location:</strong> ${race.Circuit.circuitName}, ${race.Circuit.Location.country}</p>
                                <p class="mb-5 text-white"><strong>Date:</strong> ${race.date}</p>
                            `;

          driverInfo.appendChild(p);
        });
      })
      .catch((error) => console.error("Fel vid anrop:", error));
  });
});