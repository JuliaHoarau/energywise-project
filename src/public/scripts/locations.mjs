import { response } from "express"

export class LocationsModel {
    static locations = []

    static loadLocationsFromBackend() {
        return fetch("/locations/all-locations")
        .then(response => response.json())
        .then(receivedLocations => {
            this.locations = receivedLocations
        })
    }
}


export class LocationController {

    static {
        
        LocationsModel.loadLocationsFromBackend()
        .then(() => {
            console.log("Locations loaded")
            this.renderLocationList()
        })
        
    }

    static renderLocationList() {
        const locationsList = document.querySelector("#locations-section")  
        locationsList.innerHTML = ""

        for (const location of LocationsModel.locations) {
            const locationItem = document.createElement("li")
            locationItem.textContent = location.name
            locationItem.addEventListener("click", () => {
                this.renderLocationDetails(location)
            })
            locationsList.appendChild(locationItem)
        }
    }
    
}