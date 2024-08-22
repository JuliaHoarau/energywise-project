import express from "express"
import path from "path"
import locationRoutes from "./routes/locations.mjs"

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// TODO: Enable sessions (not needed for assignment project)

app.set("view engine", "ejs")
// app.set("views", "src/views")
app.set("views", path.join(import.meta.dirname, "/views"))

app.use(express.static("src/public"))


// TODO: app.use routes
app.use("/locations", locationRoutes)

const port = 8080
app.listen(port, function() {
    console.log("Express started on http://localhost:"+port)
})