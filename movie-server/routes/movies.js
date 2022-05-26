const express = require("express")
const createError = require("http-errors")

const Movie = require("../model/Movie")


const router = express.Router()

// get all movies
router.get("/", async (req, res, next)=> {
    try{
        const movies = await Movie.find({})

        res.status(200).json(movies)

    }catch(err){
       next(err)
    }

})


// get movie by name
router.get("/:name", async (req, res, next)=> {
    try{
        const movie = await Movie.find({name: req.params.name})

        res.status(200).json(movie)

    }catch(err){
       next(err)
    }

})


// add a movie
router.post("/", async (req, res, next)=> {
    try{
        const {name, rating, releaseDate} = req.body

        const newMovie = new Movie({
            name, rating, releaseDate
        })



        await newMovie.save()

        res.status(200).json(newMovie)

    }catch(err){
       next(err)
    }

})


// edit/update a movie
router.put("/:id", async (req, res, next)=> {
    try{

        let movie = await Movie.findById(req.params.id)
        if(!movie) throw createError(404, "Movie not found")
        const {name, rating, releaseDate} = req.body

        // const newMovie = new Movie({
        //     _id: req.params.id,
        //     name, rating, releaseDate
        // })

        movie.name = name
        movie.releaseDate = releaseDate
        movie.rating = rating

        const updatedMovie = await movie.save()

        res.status(200).json(updatedMovie)

    }catch(err){
        next(err)
    }

})

// delete a movie
router.delete("/:id", async (req, res, next)=> {
    try{

        const movie = await Movie.findById(req.params.id)
        if(!movie) throw createError(404, "Movie not found")
        await Movie.findByIdAndDelete(req.params.id)

        res.status(200).json("Movie deleted successfully")

    }catch(err){
        next(err)
    }

})




module.exports = router