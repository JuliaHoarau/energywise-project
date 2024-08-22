
// This class is for the appliance details (appliance, count, running hours) that will be used in the LocationModel class
export class LocationAppliance {
    constructor(appliance, count, runningHours) {
        this.appliance = appliance; // Instance of ApplianceModel
        this.count = count; // Number of this appliance at the location
        this.runningHours = runningHours; // Daily running hours for this appliance
    }

    // Calculate the daily energy consumption for this appliance at this location
    getDailyEnergyConsumption() {
        return this.appliance.watts * this.count * this.runningHours;
    }

    clone() {
        return new LocationAppliance(this.appliance.clone(), this.count, this.runningHours);
    }
}