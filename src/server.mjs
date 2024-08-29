import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import this to get the filename

import locationRoutes from "./routes/locations.mjs";

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));



// Serve static files
app.use(express.static("src/public"));

// Use routes
app.use("/locations", locationRoutes);

const port = 8080;
app.listen(port, function() {
    console.log("Express started on http://localhost:" + port);
});
