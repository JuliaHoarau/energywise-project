export class LocationsModel {
    static searchTerm = "";
    static locations = [];

    static loadLocationsFromBackend() {
        return fetch("/locations/all-locations")
            .then(response => response.json())
            .then(receivedLocations => {
                this.locations = receivedLocations;
                this.saveLocationsToLocalStorage();
            });
    }

    static loadLocationsFromLocalStorage() {
        const storedLocations = localStorage.getItem("locations");
        if (storedLocations) {
            this.locations = JSON.parse(storedLocations);
        }
    }

    static availableAppliances = [
        'Refrigerator',
        'Washing Machine',
        'Computer',
        'Air Conditioner',
        'Heater',
        'Dryer',
        'Dishwasher',
        'Oven',
        'Microwave',
        'Toaster',
        'Coffee Maker',
        'Television',
        'Lamp'
    ];

    // A helper method to get appliance wattage from the name
static getApplianceWattage(applianceName) {
    const wattageMap = {
        // Add mappings for each appliance name to its wattage
        'Refrigerator': 100, 
        'Washing Machine': 500,
        'Computer': 200,
        'Air Conditioner': 350,
        "Heater": 1500,
        "Dryer": 3000,
        "Dishwasher": 1800,
        "Oven": 2150,
        "Microwave": 1000,
        "Toaster": 800,
        "Coffee Maker": 900,
        "Television": 150,
        "Lamp": 60,

        // Add all other appliance wattages here
    };
    return wattageMap[applianceName] || 0; // Return 0 if the appliance is not found
}

    static saveLocationsToLocalStorage() {
        localStorage.setItem("locations", JSON.stringify(this.locations));
    }
    static createLocation(location) {
        // Calculate total energy consumption for the new location
        location.totalEnergyConsumption = location.appliances.reduce((total, appliance) => {
            return total + (appliance.count * appliance.runningHours * this.getApplianceWattage(appliance.appliance.name));
        }, 0);
        
        this.locations.push(location);
        this.saveLocationsToLocalStorage();
    }static updateLocation(locationName, updatedLocation) {
        updatedLocation.totalEnergyConsumption = updatedLocation.appliances.reduce((total, appliance) => {
            return total + (appliance.count * appliance.runningHours * this.getApplianceWattage(appliance.appliance.name));
        }, 0);
    
        const index = this.locations.findIndex(loc => loc.name === locationName);
        if (index !== -1) {
            this.locations[index] = updatedLocation;
            this.saveLocationsToLocalStorage();
        }
    }

    static deleteLocation(locationName) {
        this.locations = this.locations.filter(loc => loc.name !== locationName);
        this.saveLocationsToLocalStorage();
    }

    static getLocationByName(locationName) {
        return this.locations.find(location => location.name === locationName);
    }

    static setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm;
    }

    static getSearchResults() {
        return this.locations.filter(location => {
            if (!location) {
                console.warn("Encountered an undefined location object:", location);
                return false;
            }
            if (!location.name) {
                console.warn("Location object missing 'name' property:", location);
                return false;
            }
            if (!location.state) {
                console.warn("Location object missing 'state' property:", location);
                return false;
            }

            return this.searchTerm === ""
                || location.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                || location.state.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
    }
}