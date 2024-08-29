
// import { EnergyStatsModel } from "./locationStats.mjs";
// import { EnergyStatsController } from "./locationStats.mjs";
// import { EnergyStatsView } from "./locationStats.mjs";
// export class LocationsModel {
//     static searchTerm = "";
//     static locations = [];

//     static loadLocationsFromBackend() {
//         return fetch("/locations/all-locations")
//             .then(response => response.json())
//             .then(receivedLocations => {
//                 this.locations = receivedLocations;
//                 this.saveLocationsToLocalStorage();
//             });
//     }

//     static loadLocationsFromLocalStorage() {
//         const storedLocations = localStorage.getItem("locations");
//         if (storedLocations) {
//             this.locations = JSON.parse(storedLocations);
//         }
//     }

//     static availableAppliances = [
//         'Refrigerator',
//         'Washing Machine',
//         'Computer',
//         'Air Conditioner',
//         'Heater',
//         'Dryer',
//         'Dishwasher',
//         'Oven',
//         'Microwave',
//         'Toaster',
//         'Coffee Maker',
//         'Television',
//         'Lamp'
//     ];

//     // A helper method to get appliance wattage from the name
// static getApplianceWattage(applianceName) {
//     const wattageMap = {
//         // Add mappings for each appliance name to its wattage
//         'Refrigerator': 100, 
//         'Washing Machine': 500,
//         'Computer': 200,
//         'Air Conditioner': 350,
//         "Heater": 1500,
//         "Dryer": 3000,
//         "Dishwasher": 1800,
//         "Oven": 2150,
//         "Microwave": 1000,
//         "Toaster": 800,
//         "Coffee Maker": 900,
//         "Television": 150,
//         "Lamp": 60,

//         // Add all other appliance wattages here
//     };
//     return wattageMap[applianceName] || 0; // Return 0 if the appliance is not found
// }

//     static saveLocationsToLocalStorage() {
//         localStorage.setItem("locations", JSON.stringify(this.locations));
//     }
//     static createLocation(location) {
//         // Calculate total energy consumption for the new location
//         location.totalEnergyConsumption = location.appliances.reduce((total, appliance) => {
//             return total + (appliance.count * appliance.runningHours * this.getApplianceWattage(appliance.appliance.name));
//         }, 0);
        
//         this.locations.push(location);
//         this.saveLocationsToLocalStorage();
//     }static updateLocation(locationName, updatedLocation) {
//         updatedLocation.totalEnergyConsumption = updatedLocation.appliances.reduce((total, appliance) => {
//             return total + (appliance.count * appliance.runningHours * this.getApplianceWattage(appliance.appliance.name));
//         }, 0);
    
//         const index = this.locations.findIndex(loc => loc.name === locationName);
//         if (index !== -1) {
//             this.locations[index] = updatedLocation;
//             this.saveLocationsToLocalStorage();
//         }
//     }

//     static deleteLocation(locationName) {
//         this.locations = this.locations.filter(loc => loc.name !== locationName);
//         this.saveLocationsToLocalStorage();
//     }

//     static getLocationByName(locationName) {
//         return this.locations.find(location => location.name === locationName);
//     }

//     static setSearchTerm(searchTerm) {
//         this.searchTerm = searchTerm;
//     }

//     static getSearchResults() {
//         return this.locations.filter(location => {
//             if (!location) {
//                 console.warn("Encountered an undefined location object:", location);
//                 return false;
//             }
//             if (!location.name) {
//                 console.warn("Location object missing 'name' property:", location);
//                 return false;
//             }
//             if (!location.state) {
//                 console.warn("Location object missing 'state' property:", location);
//                 return false;
//             }

//             return this.searchTerm === ""
//                 || location.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//                 || location.state.toLowerCase().includes(this.searchTerm.toLowerCase());
//         });
//     }
// }



// export class LocationController {
//         static availableIcons = ["🏠", "🏢", "🏬", "🏡", "🏭", "🏦", "🏨", "🏥", "🏪", "🏫", "🍝"];
//     static availableAppliances = [
//         'Refrigerator',
//         'Washing Machine',
//         'Computer',
//         'Air Conditioner',
//         'Heater',
//         'Dryer',
//         'Dishwasher',
//         'Oven',
//         'Microwave',
//         'Toaster',
//         'Coffee Maker',
//         'Television',
//         'Lamp'
//     ];

//     static {
//         // First, try to load from LocalStorage
//         LocationsModel.loadLocationsFromLocalStorage();
        
//         // If no locations are found in LocalStorage, load from the backend
//         if (LocationsModel.locations.length === 0) {
//             LocationsModel.loadLocationsFromBackend().then(() => {
//                 console.log("Locations loaded from backend");
//                 this.renderLocationList();
//             });
//         } else {
//             console.log("Locations loaded from LocalStorage");
//             this.renderLocationList();
//         }

//         // Setup the input event on the search bar
//         document.getElementById("location-search")
//             .addEventListener("input", (event) => {
//                 LocationsModel.setSearchTerm(event.target.value);
//                 this.renderLocationList();
//             });
//     }

//     static renderLocationList() {
//         const locationsList = document.querySelector("#locations-section"); // Use ID since it's a unique section
    
//         // Clear the existing content in the locations list
//         locationsList.innerHTML = "";
    
//         // Create the "Create a new location" card
//         const createLocationCard = document.createElement("div");
//         createLocationCard.className = "create-location-card"; // Assign a class for styling
    
//         // Add the title
//         const titleElement = document.createElement("h2");
//         titleElement.textContent = "Create a new location";
//         createLocationCard.appendChild(titleElement);
    
//         // Add the description
//         const descriptionElement = document.createElement("p");
//         descriptionElement.textContent =
//             "A sustainable future starts with you. Add your location and find out where you can make a difference.";
//         createLocationCard.appendChild(descriptionElement);
    
//         // Optional: Add an event listener to handle clicks on this card
//         createLocationCard.addEventListener("click", () => {
//             this.renderCreateLocationForm()
//         });
    
//         // Prepend this card to the locations list
//         locationsList.appendChild(createLocationCard);
    
//         // Use the filtered search results to render the locations
//         const filteredLocations = LocationsModel.getSearchResults();
    
//         for (const location of filteredLocations) {
//             // Create a card for each location
//             const locationCard = document.createElement("div");
//             locationCard.className = "location-card"; // Assign a class for styling
    
//             // Create a container for the location icon and buttons
//             const locationButtonContainer = document.createElement("div");
//             locationButtonContainer.className = "location-button-container";
    
//             // Add the icon
//             const iconElement = document.createElement("span");
//             iconElement.className = "icon";
//             iconElement.textContent = location.icon;
//             locationButtonContainer.appendChild(iconElement);
    
//             const buttonsContainer = document.createElement("div");
//             buttonsContainer.className = "buttons-container";
    
//             // Add the stats button
//             const statsButton = document.createElement("button");
//             statsButton.className = "stats-button";
//             statsButton.textContent = "Stats"; // Add button text
//             statsButton.addEventListener("click", () => {
//                 window.location.href = `/locations/location-stats?state=${encodeURIComponent(location.state)}&name=${encodeURIComponent(location.name)}`;
//             });
            

//             buttonsContainer.appendChild(statsButton);
    
//             // Add the edit button
//             const editButton = document.createElement("button");
//             editButton.className = "edit-button";
//             editButton.textContent = "Edit";
//             editButton.addEventListener("click", () => {
//                 this.renderEditLocationForm(location);
//             });
//             buttonsContainer.appendChild(editButton);
    
  
    
//             // Append the buttons container to the location button container
//             locationButtonContainer.appendChild(buttonsContainer);
    
//             // Append the location button container to the card
//             locationCard.appendChild(locationButtonContainer);
    
//             // Create a container for the location details
//             const detailsContainer = document.createElement("div");
//             detailsContainer.className = "details-container";
    
//             // Add the name and state
//             const nameElement = document.createElement("h2");
//             nameElement.textContent = `${location.name}, ${location.state}`;
//             detailsContainer.appendChild(nameElement);
    
//             // Add the total energy consumption
//             const energyElement = document.createElement("h3");
//             energyElement.textContent = `${location.totalEnergyConsumption} watt-hours`;
//             detailsContainer.appendChild(energyElement);
    
//             // Create a sublist for appliances
//             const applianceList = document.createElement("div");
//             applianceList.className = "appliance-list"; // Assign a class for styling
    
//             for (const appliance of location.appliances) {
//                 const applianceItem = document.createElement("p");
//                 applianceItem.className = "appliance-item"; // Assign a class for styling
    
//                 // Add appliance details
//                 const applianceName = document.createElement("p");
//                 applianceName.textContent = `${appliance.appliance.name} x${appliance.count}`;
//                 applianceItem.appendChild(applianceName);

    
//                 // Append the appliance details to the appliance list
//                 applianceList.appendChild(applianceItem);
//             }
    
//             // Append the appliance list to the details container
//             detailsContainer.appendChild(applianceList);
//             locationCard.appendChild(detailsContainer);
    
//             // Add event listener for further interaction (e.g., view details)
//             detailsContainer.addEventListener("click", () => {
//                 console.log(`Location clicked: ${location.name}`);
//                 // Potentially load detailed view or navigate to another page
//             });
    
//             // Append the constructed card to the section
//             locationsList.appendChild(locationCard);
//         }
//     }
    


//     static renderEditLocationForm(location) {
//         // Clear the locations list to show the form
//         const locationsList = document.querySelector("#locations-section");
//         locationsList.innerHTML = '';

//         // Create the form
//         const form = document.createElement("form");
//         form.className = "edit-location-form";

//         // Add inputs for name, state, and appliances
//         form.innerHTML = `
//             <label for="location-name">Location Name:</label>
//             <input type="text" id="location-name" value="${location.name}" />

//             <label for="location-state">State/Territory:</label>
//             <input type="text" id="location-state" value="${location.state}" />

//             <label for="location-icon">Icon:</label>
//             <select id="location-icon">
//                 ${LocationController.availableIcons.map(icon => `
//                     <option value="${icon}" ${icon === location.icon ? 'selected' : ''}>${icon}</option>
//                 `).join('')}
//             </select>

//             <div id="appliances-list">
//                 <h3>Appliances</h3>
//                 ${location.appliances.map((appliance, index) => `
//                     <div class="appliance-item" data-index="${index}">
//                         <select required>
//                             <option value="" disabled>Select an Appliance</option>
//                             ${LocationController.availableAppliances.map(app => `
//                                 <option value="${app}" ${app === appliance.appliance.name ? 'selected' : ''}>${app}</option>
//                             `).join('')}
//                         </select>
//                         <input type="number" value="${appliance.count}" placeholder="Count" />
//                         <input type="number" value="${appliance.runningHours}" placeholder="Running Hours" />
//                         <button type="button" class="delete-appliance">Delete</button>
//                     </div>
//                 `).join('')}
//             </div>
//             <button type="button" id="add-appliance">Add Appliance</button>
//             <button type="submit">Save Changes</button>
//             <button type="button" id="delete-location" style="background-color: red; color: white;">Delete Location</button>
//         `;

//         // Append the form to the locations list
//         locationsList.appendChild(form);

//         // Handle form submission for updating the location
//         form.addEventListener("submit", (event) => {
//             event.preventDefault();
//             const updatedLocation = {
//                 name: document.getElementById("location-name").value,
//                 state: document.getElementById("location-state").value,
//                 icon: document.getElementById("location-icon").value,
//                 appliances: [...document.querySelectorAll('.appliance-item')].map(item => {
//                     return {
//                         appliance: { name: item.querySelector('select').value },
//                         count: item.querySelector('input[type="number"]').value,
//                         runningHours: item.querySelector('input[type="number"]').value
//                     };
//                 }),
//             };

//             // Calculate total energy consumption before saving
//             updatedLocation.totalEnergyConsumption = updatedLocation.appliances.reduce((total, appliance) => {
//                 return total + (appliance.count * appliance.runningHours * LocationsModel.getApplianceWattage(appliance.appliance.name));
//             }, 0);

//             LocationsModel.updateLocation(location.name, updatedLocation);
//             this.renderLocationList();  // Re-render the list after update
//         });

//         // Handle adding a new appliance
//         document.getElementById("add-appliance").addEventListener("click", () => {
//             const appliancesList = document.getElementById("appliances-list");
//             const newAppliance = document.createElement("div");
//             newAppliance.className = "appliance-item";

//             newAppliance.innerHTML = `
//                 <select required>
//                     <option value="" disabled selected>Select an Appliance</option>
//                     ${LocationController.availableAppliances.map(appliance => `
//                         <option value="${appliance}">${appliance}</option>
//                     `).join('')}
//                 </select>
//                 <input type="number" placeholder="Count" required />
//                 <input type="number" placeholder="Running Hours" required />
//                 <button type="button" class="delete-appliance">Delete</button>
//             `;
//             appliancesList.appendChild(newAppliance);

//             // Handle deleting the new appliance
//             newAppliance.querySelector(".delete-appliance").addEventListener("click", () => {
//                 newAppliance.remove();
//             });
//         });

//         // Handle deleting an existing appliance
//         document.querySelectorAll(".delete-appliance").forEach(button => {
//             button.addEventListener("click", () => {
//                 button.closest(".appliance-item").remove();
//             });
//         });

//         // Handle location deletion
//         document.getElementById("delete-location").addEventListener("click", () => {
//             if (confirm(`Are you sure you want to delete the location "${location.name}"?`)) {
//                 LocationsModel.deleteLocation(location.name);
//                 this.renderLocationList();  // Re-render the list after deletion
//             }
//         });
//     }
 
    

//     static renderCreateLocationForm() {
//         const locationsList = document.querySelector("#locations-section");
//         locationsList.innerHTML = ''; // Clear the section to show the form
    
//         // Create the form for creating a new location
//         const form = document.createElement("form");
//         form.className = "create-location-form";
    
//         // Define available icons
//         const availableIcons = ["🏠", "🏢", "🏬", "🏡", "🏭", "🏦", "🏨", "🏥", "🏪", "🏫", "🍝"];
//         form.innerHTML = `
//             <label for="location-name">Location Name:</label>
//             <input type="text" id="location-name" required />
    
//             <label for="location-state">State/Territory:</label>
//             <input type="text" id="location-state" required />
    
//             <label for="location-icon">Icon:</label>
//             <select id="location-icon">
//                 ${availableIcons.map(icon => `<option value="${icon}">${icon}</option>`).join('')}
//             </select>
    
//             <div id="appliances-list">
//                 <h3>Appliances</h3>
//                 <!-- Appliance inputs will be added here dynamically -->
//             </div>
//             <button type="button" id="add-appliance">Add Appliance</button>
//             <button type="submit">Save Location</button>
//         `;
    
//         locationsList.appendChild(form);
    
//         document.getElementById("add-appliance").addEventListener("click", () => {
//             const appliancesList = document.getElementById("appliances-list");
//             const newAppliance = document.createElement("div");
//             newAppliance.className = "appliance-item";
    
//             newAppliance.innerHTML = `
//                 <select required>
//                     <option value="" disabled selected>Select an Appliance</option>
//                     ${LocationsModel.availableAppliances.map(appliance => `<option value="${appliance}">${appliance}</option>`).join('')}
//                 </select>
//                 <input type="number" placeholder="Count" required />
//                 <input type="number" placeholder="Running Hours" required />
//                 <button type="button" class="delete-appliance">Delete</button>
//             `;
//             appliancesList.appendChild(newAppliance);
    
//             // Handle deleting the new appliance
//             newAppliance.querySelector(".delete-appliance").addEventListener("click", () => {
//                 newAppliance.remove();
//             });
//         });
    
//         form.addEventListener("submit", (event) => {
//             event.preventDefault();
//             const newLocation = {
//                 name: document.getElementById("location-name").value,
//                 state: document.getElementById("location-state").value,
//                 icon: document.getElementById("location-icon").value,
//                 appliances: [...document.querySelectorAll('.appliance-item')].map(item => {
//                     return {
//                         appliance: { name: item.querySelector('select').value },
//                         count: item.querySelector('input[type="number"]').value,
//                         runningHours: item.querySelector('input[type="number"]').value
//                     };
//                 }),
//             };
    
//             // Calculate total energy consumption before saving
//             newLocation.totalEnergyConsumption = newLocation.appliances.reduce((total, appliance) => {
//                 return total + (appliance.count * appliance.runningHours * LocationsModel.getApplianceWattage(appliance.appliance.name));
//             }, 0);
    
//             LocationsModel.createLocation(newLocation);
//             this.renderLocationList();  // Re-render the list after creating the new location
//         });
//     }
    

// }

// window.LocationController = LocationController;
