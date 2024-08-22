import { DataModel } from "./DataModel.mjs";

export class ApplianceModel extends DataModel {
    static lastId = 0;

    constructor(name, watts) {
        super();
        this.applianceId = ++ApplianceModel.lastId;
        this.name = name;
        this.watts = watts;
    }

    clone() {
        return new ApplianceModel(this.name, this.watts);
    }
}

// Remove the getter and setter for applianceId as they might cause issues


ApplianceModel.setDataSource([
    new ApplianceModel("Refrigerator", 100),
    new ApplianceModel("Air Conditioner", 350),
    new ApplianceModel("Heater", 1500),
    new ApplianceModel("Washing Machine", 500),
    new ApplianceModel("Dryer", 3000),
    new ApplianceModel("Dishwasher", 1800),
    new ApplianceModel("Oven", 2150),
    new ApplianceModel("Microwave", 1000),
    new ApplianceModel("Toaster", 800),
    new ApplianceModel("Coffee Maker", 900),
    new ApplianceModel("Television", 150),
    new ApplianceModel("Computer", 200),
    new ApplianceModel("Lamp", 60),
    new ApplianceModel("Refrigerator", 150)
]);

const allAppliances = ApplianceModel.select()

console.log(allAppliances)