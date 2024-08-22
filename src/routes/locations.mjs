import express from "express"
import { LocationController } from "../controllers/LocationController.mjs"

const locationRoutes = express.Router()

locationRoutes.get("/", LocationController.viewLocationsPage)
locationRoutes.get("/all-locations", LocationController.getLocationsJSON)
locationRoutes.get("/locations/:name", LocationController.viewLocationDetailsPartial)

export default locationRoutes