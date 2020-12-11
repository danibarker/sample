const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/api/resources", function (req, res) {
    const file_content = fs.readFileSync("resources.json");
    var allResources = JSON.parse(file_content);
    res.send(allResources);
});

/* Sample body for post:
{
    "category":"depression", "resource":
    {
        "color1": "Red",
        "color2": "Green",
        "name": "Affirmation Pod",
        "description": "A podcast meant to help people accept themsleves through self affirmation and positivity",
        "link": "https://www.affirmationpod.com"
    }
}
*/
app.post("/api/resources", function (req, res) {
    let category = req.body.category;
    let resource = req.body.resource;
    const file_content = fs.readFileSync("resources.json");
    var allResources = JSON.parse(file_content);
    allResources[category].push(resource);
    fs.writeFile(
        "resources.json",
        JSON.stringify(allResources),
        function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(allResources));
            console.log("writing to resources.json");
        }
    );
    res.status(200).send;
});

app.use(express.static("../website"));

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started on:" + port);
});
