import 'dotenv/config'
import  Express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

// Set the view engine to EJS
app.set("view Engine", "ejs");

// Serve the public folder as static files
app.use(Express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

//render the index page with default values
app.get("/",(req,res) =>{
    res.render("index.ejs",{ weather: null,error: null});
});

//render and handle the /weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    
    const apiKey = process.env.APIKEY;
    //get the weather data from the openweather 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let error = null;

    try {
      const response = await axios.get(apiUrl);
      const weather = response.data;
      res.render("index.ejs", { weather ,error});
    
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", { error: "Error, Please try again", weather:null});
    }
  });

//start the server and listen on port{3000}
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  