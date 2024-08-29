import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { LocationController } from "../controllers/LocationController.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locationRoutes = express.Router();

// Existing routes
locationRoutes.get("/", LocationController.viewLocationsPage);
locationRoutes.get("/all-locations", LocationController.getLocationsJSON);
locationRoutes.get("/locations/:name", LocationController.viewLocationDetailsPartial);

// Route for location stats page
locationRoutes.get("/location-stats", (req, res) => {
    const statsPagePath = path.join(__dirname, "../public/views/locationStats.html");
    console.log(`Serving file from: ${statsPagePath}`); // Debugging line
    res.sendFile(statsPagePath);
});

export default locationRoutes;
