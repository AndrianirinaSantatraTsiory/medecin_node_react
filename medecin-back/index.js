const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const medecinRoutes=require("./routes/medecinRoute");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.listen(5000 ,() => {
    console.log("server is running on port 5000")
})

app.use("/medecin",medecinRoutes);