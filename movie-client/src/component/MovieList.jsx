import React, {useEffect, useState} from 'react'
import {Box, Grid} from "@mui/material"
import axios from "axios"

import MovieItem from './MovieItem'

const BASE_URL = "http://localhost:4532/movies"



const MovieList = () => {

    const [movies, setMovies] = useState()

    useEffect(()=> {
        loadMovies()
    }, [])

    const loadMovies = async ()=> {
        try{
            const res = await axios({
                method: "get",
                url: BASE_URL
            })

            console.log(res.data)

            if(res.data){
                setMovies(res.data)
            }

        }catch(err){
            console.log(err)
        }
    }
    

  return (
    <Box>
        {movies && <Grid container justifyContent="center" spacing={3} alignItems="center">
            {movies.map(movie=> <Grid key={movie._id} item xs={4} md={3} lg={2}>
                <MovieItem movie={movie}/>
            </Grid>)}
        </Grid>}

    </Box>
  )
}

export default MovieList