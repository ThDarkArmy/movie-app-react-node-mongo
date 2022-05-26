const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const createError = require("http-errors")

require("./config/db")


const PORT = 4532

const app = express()


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

const movies = require("./routes/movies")

app.use("/movies", movies)


app.use(async(req, res, next)=> {
    next(createError.NotFound())
})

app.use((err, req, res, next)=> {
    res.status(err.status|| 500).json({
        success: false,
        message: err.message,
        error: err
    })

})





app.listen(PORT, ()=> console.log("Server is running on port: ", PORT))