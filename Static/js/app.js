// Put json file  in a const URL 
// I've used the "Country" key directly for the dropdown menu options and selection to adapt to the url 
//const url = "http://localhost:8000/projectdata_modified.json"; 
// put the db under static so  flask can take it 
const url = 'http://127.0.0.1:5000/all_data';

 // Create a horizontal bar chart with a dropdown menu to display data for the selected country.
// Modify the barChart function for better visualization of two selected countries
// Modify the barChart function to display entries on the y-axis and values on the x-axis with 2 colors for the countries selected
function barChart(selectedCountries) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
          selectedCountries.includes(countryData.country)
      );

      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
          x: ["Low-Carbon Electricity"],
          y: [
              parseFloat(selectedCountryData["low_carbon_electricity_"])
          ],
          type: 'bar',
          marker: {
              color: index === 0 ? 'rgba(226, 115, 74, 0.7)' : 'rgba(54, 134, 38, 0.7)',
          },
          name: selectedCountryData.country,
          orientation: 'v',
      }));

      const layout = {
          title: 'Low-Carbon Electricity %',
          yaxis: {
              title: '% of Total Energy',
              automargin: true,
          },
      };
      Plotly.newPlot('barChart', trace, layout);
  });
}

function barChart2(selectedCountries) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
          selectedCountries.includes(countryData.country)
      );

      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
          x: ["GDP"],
          y: [
              parseFloat(selectedCountryData["gdp_per_capita"])
          ],
          type: 'bar',
          marker: {
              color: index === 0 ? 'rgba(226, 115, 74, 0.7)' : 'rgba(54, 134, 38, 0.7)',
          },
          name: selectedCountryData.country,
          orientation: 'v',
      }));

      const layout = {
          title: 'GDP ($ Per Capita)',
          yaxis: {
              title: '$ per Capita',
              automargin: true,
          },
      };
      Plotly.newPlot('barChart2', trace, layout);
  });
}

function barChart3(selectedCountries) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
          selectedCountries.includes(countryData.country)
      );

      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
          x: ["CO2 Emissions"],
          y: [
              parseFloat(selectedCountryData["co2_emissions_metric_tons_per_capita"])
          ],
          type: 'bar',
          marker: {
              color: index === 0 ? 'rgba(226, 115, 74, 0.7)' : 'rgba(54, 134, 38, 0.7)',
          },
          name: selectedCountryData.country,
          orientation: 'v',
      }));

      const layout = {
          title: 'CO2 Emissions',
          yaxis: {
              title: 'Metric Tons per Capita',
              automargin: true,
          },
      };
      Plotly.newPlot('barChart3', trace, layout);
  });
}

function bubbleChart(selectedCountries) {
  // Fetch the JSON data 
  d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
          selectedCountries.includes(countryData.country)
      );

      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
          x: ["Land Mass"],
          y: [
              parseFloat(selectedCountryData["population"])
          ],
          text: ["Population"],
          mode: 'markers',
          marker: {
              size: selectedCountryData["land_area_km2"] * 0.00005,
              color: index === 0 ? 'rgba(226, 115, 74, 0.7)' : 'rgba(54, 134, 38, 0.7)',
          },
          name: selectedCountryData.country,
      }));

      const bubbleLayout = {
          title: 'Land Mass vs Population',
          yaxis: {
              title: 'Population in Millions',
          },
      };

      // Plot the bubble chart with the selected countries
      Plotly.newPlot('bubbleChart', trace, bubbleLayout);
  });
}

// function "demog" to filter data for selected country and update the html accordingly based on the selected country
function demog(selectedCountries) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let countryDataList = data.projectdata;

    // Filter data for selected countries
    let selectedCountriesData = countryDataList.filter((countryData) =>
      selectedCountries.includes(countryData.country)
    );

    // Update the HTML elements with the information
    selectedCountriesData.forEach((selectedCountryData, index) => {
      let infoPanel = d3.select(`#sample-metadata${index + 1}`);
      infoPanel.html('');

      // Iterate through the selectedCountryData object and console for each country
      Object.entries(selectedCountryData).forEach(([key, value]) => {
        infoPanel.append('h5').text(`${key}: ${value}`);
      });
    });

    // Log the entries array to the  console
    console.log(selectedCountriesData);
  });
}

 //  //  //  //  // Dropdown Menu //  //  //  //  //
// put a variable for Dropdown Menu for Country1
let dropdownMenu1 = d3.select('#selCountry1');

// put a variable for Dropdown Menu for Country2 
let dropdownMenu2 = d3.select('#selCountry2');

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  let countryList = data.projectdata.map((countryData) => countryData.country);

// Populate Country1 dropdown
countryList.forEach((country) => {
  dropdownMenu1.append('option').text(country).property('value', country);
});

// Populate Country2 dropdown
countryList.forEach((country) => {
  dropdownMenu2.append('option').text(country).property('value', country);
});

// Select initial countries based on dropdown selections
let initialCountry1 = dropdownMenu1.property('value');
let initialCountry2 = dropdownMenu2.property('value');
 // Pass the initial selections as an array
 plot([initialCountry1, initialCountry2]);
});

// Listen for changes on the dropdowns menu for Country1
dropdownMenu1.on('change', function () {
  let selectedCountry1 = dropdownMenu1.property('value');
  let selectedCountry2 = dropdownMenu2.property('value');
  plot([selectedCountry1, selectedCountry2]);

  // Update Country1 Info
  optionChanged('1', selectedCountry1);
});
// Listen for changes on the dropdowns menu for Country2
dropdownMenu2.on('change', function () {
  let selectedCountry1 = dropdownMenu1.property('value');
  let selectedCountry2 = dropdownMenu2.property('value');
  plot([selectedCountry1, selectedCountry2]);

  // Update Country2 Info
  optionChanged('2', selectedCountry2);
});
 //  //  //  //  // 

// Function to update info based on selected country
function optionChanged(countryType, selectedCountry) {
  d3.json(url).then((data) => {
    let countryDataList = data.projectdata;
    let selectedCountryData = countryDataList.find((countryData) => countryData.country === selectedCountry);

    // Update the HTML elements with the information
    let infoPanel = d3.select(`#sample-metadata${countryType}`);
    infoPanel.html('');

    Object.entries(selectedCountryData).forEach(([key, value]) => {
      infoPanel.append('h5').text(`${key}: ${value}`);
    });
  });
};

// Function to plot all charts when we have new selections for country 
function plot(selectedCountries) {
  console.log(selectedCountries);
  demog(selectedCountries);
  barChart(selectedCountries);
  barChart2(selectedCountries);
  barChart3(selectedCountries);
  bubbleChart(selectedCountries);
};


// Initiation function
function init() {
  // Dropdown Menu
  let dropdownMenu = d3.select('#selDataset');

  // Fetch the JSON data and console log it
  d3.json(url).then(function (data) {
    let countryList = data.projectdata.map((countryData) => countryData.country);

    countryList.forEach((country) => {
      dropdownMenu.append('option').text(country).property('value', country);
    });
// Select the first two countries algeria and angola 
    let initialCountries = countryList.slice(0, 2); 
    // Plot the initial selection as an array
    plot(initialCountries); 
  });

  dropdownMenu.on('change', function () {
    let selectedCountries = d3.select('#selDataset').selectAll('option:checked').nodes().map(option => option.value);
    plot(selectedCountries);
  });
};

init();