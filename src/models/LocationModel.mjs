import { DataModel } from "./DataModel.mjs";
import { ApplianceModel } from "./ApplianceModel.mjs";
import { LocationAppliance } from "./LocationApplianceModel.mjs";

export class LocationModel extends DataModel {
    constructor(name, state, appliances = [], icon = "?") {
        super();
        this.locationId = ++DataModel.lastId;
        this.name = name;
        this.state = state;
        this.icon = icon;
        this.appliances = []; // Array of LocationAppliance objects

        // Add appliances
        appliances.forEach(applianceData => {
            const { appliance, count, runningHours } = applianceData;
            this.addAppliance(appliance, count, runningHours);
        });

        this.calculateTotalEnergyConsumption();
    }

    calculateTotalEnergyConsumption() {
        this.totalEnergyConsumption = this.appliances.reduce((total, locationAppliance) => {
            return total + locationAppliance.getDailyEnergyConsumption();
        }, 0);
    }

    addAppliance(appliance, count, runningHours) {
        if (appliance instanceof ApplianceModel) {
            const locationAppliance = new LocationAppliance(appliance, count, runningHours);
            this.appliances.push(locationAppliance);
            this.calculateTotalEnergyConsumption();
        } else {
            throw new Error("Invalid appliance.");
        }
    }

    clone() {
        return new LocationModel(this.name, this.state, this.appliances.map(a => a.clone()), this.icon);
    }
}

// Remove the getter and setter for locationId as they might cause issues

LocationModel.setDataSource([
    new LocationModel("Home", "Queensland", [
        { appliance: ApplianceModel.select(a => a.name === "Refrigerator")[0], count: 1, runningHours: 24 },
        { appliance: ApplianceModel.select(a => a.name === "Washing Machine")[0], count: 1, runningHours: 1 },
        { appliance: ApplianceModel.select(a => a.name === "Computer")[0], count: 2, runningHours: 8}
    ], "🏠"),
    // Ensure all fields are provided
    new LocationModel("Office", "New South Wales", [
        { appliance: ApplianceModel.select(a => a.name === "Heater")[0], count: 5, runningHours: 10 },
        { appliance: ApplianceModel.select(a => a.name === "Washing Machine")[0], count: 1, runningHours: 2 }
    ], "🖥️"),
    new LocationModel("Work", "Queensland", [
        { appliance: ApplianceModel.select(a => a.name === "Refrigerator")[0], count: 3, runningHours: 24 },
        { appliance: ApplianceModel.select(a => a.name === "Computer")[0], count: 10, runningHours: 8 },
        { appliance: ApplianceModel.select(a => a.name === "Lamp")[0], count: 0, runningHours: 20 }
    ], "🏢")
]);

// Step 2.3: Retrieve and display the locations to verify correct initialization
const locations = LocationModel.select();
console.log(locations);


