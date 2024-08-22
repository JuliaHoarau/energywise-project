import { LocationModel } from "../models/LocationModel.mjs";

export class LocationController {

    static viewLocationsPage(req, res) {
        res.render("locations.ejs")
    }
    static getLocationsJSON(req, res) {
        const results = LocationModel.select()
        res.status(200).json(results)
    }

    static viewLocationDetailsPartial(req, res) {
        const locationName = req.params.name
        console.log(`Location name: ${locationName}`)
        const result = LocationModel.select(location => location.name === locationName)

        if (result.length > 0) {
            const location = result[0]

            res.render("partials/locationDetails.ejs", { location })

        } else {
            res.json({message: "not found?!"})
        } 
    }
}
