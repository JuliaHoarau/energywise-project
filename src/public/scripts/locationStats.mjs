export class EnergyStatsModel {
    static energyData = {
        "New South Wales": { wind: 12, solar: 15, gas: 25, coal: 48 },
        "Victoria": { wind: 20, solar: 22, gas: 30, coal: 28 },
        "Queensland": { wind: 10, solar: 20, gas: 25, coal: 45 },
        "Western Australia": { wind: 15, solar: 20, gas: 35, coal: 30 },
        "South Australia": { wind: 40, solar: 30, gas: 20, coal: 10 },
        "Tasmania": { wind: 60, solar: 20, gas: 10, coal: 10 },
        "Australian Capital Territory": { wind: 30, solar: 40, gas: 20, coal: 10 },
        "Northern Territory": { wind: 20, solar: 30, gas: 40, coal: 10 }
    }

    // Retrieve the energy sources for a specific state or territory.
    // Takes the the state's name as a parameter and returns the related energy sources
    // and if the the state is not found it returns null
    static getEnergySourcesForLocation(locationState) {
        console.log("Looking up energy sources for state:", locationState);
        return this.energyData[locationState] || null;
    }
    

    // Calculates the total energy usage from all sources for a given location.
    // Takes an object representing energy sources and values as input and returns
    // the total sum of all the values in watt-hours
    static calculateTotalEnergyUsage(sources) {
        return Object.values(sources).reduce((total, amount) => total + amount, 0)
    }
}
export class EnergyStatsController {
    static renderStatsPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const locationName = urlParams.get('name');
        const locationState = urlParams.get('state');

        const sources = EnergyStatsModel.getEnergySourcesForLocation(locationState);

        
        const totalUsage = EnergyStatsModel.calculateTotalEnergyUsage(sources);
        EnergyStatsView.render({ name: locationName, state: locationState }, sources, totalUsage);
    }
}


// Automatically render the stats page when the script is loaded
document.addEventListener("DOMContentLoaded", () => {
    EnergyStatsController.renderStatsPage();
});


export class EnergyStatsView {
    static render(location, sources, totalUsage) {
        const mainSection = document.querySelector("#main-section");

        // Ensure mainSection exists
        if (!mainSection) {
            console.error("Element with ID 'main-section' not found!");
            return;
        }

        mainSection.innerHTML = "";

        const heading = document.createElement("h1");
        heading.textContent = `Energy Usage for ${location.name}, ${location.state}`;
        mainSection.appendChild(heading);




        // Create the canvas for the pie chart
        const pieChart = document.createElement("canvas");
        pieChart.id = "pie-chart";
        mainSection.appendChild(pieChart);

        // Generate the pie chart
        this.generatePieChart(pieChart, sources);

        // Display the list of energy sources

        const sourceList = document.createElement("ul");
        for (const [source, amount] of Object.entries(sources)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${source}: ${amount} watt-hours`;
            sourceList.appendChild(listItem);
        }
        mainSection.appendChild(sourceList);
    }

    static generatePieChart(container, sources) {
        // Prepare the data for Chart.js
        const data = {
            labels: Object.keys(sources), // Energy sources (e.g., wind, solar, etc.)
            datasets: [{
                label: 'Energy Source Distribution',
                data: Object.values(sources), // The corresponding values for each energy source
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Create the pie chart
        new Chart(container, {
            type: 'pie', // Type of chart
            data: data, // Data to display
            options: {
                responsive: true, // Make the chart responsive
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        align: 'center',
                        display: true,
                        text: 'Energy Source Distribution'
                    }
                }
            }
        });
    }
}
