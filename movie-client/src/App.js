import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  AppBar,
  Toolbar,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import MovieList from "../src/component/MovieList";

const BASE_URL = "http://localhost:4532/movies";

const App = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [rating, setRating] = useState();

  const addMovie = async () => {
    try {
      const movieData = {
        name: name,
        releaseDate: releaseDate,
        rating: rating,
      };

      console.log(movieData)

      if (name!==undefined && releaseDate!=undefined && rating!==undefined) {
        const res = await axios({
          method: "post",
          url: BASE_URL,
          data: JSON.stringify(movieData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          alert("Movie added successfully");
        }
      } else {
        throw "No any field can be empty";
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Movies</Typography>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            color="secondary"
            sx={{ marginLeft: "auto" }}
          >
            Add Movie
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 3 }}>
        <MovieList />
      </Box>

      <Box>
      <Dialog open={open} >
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            id="rating"
            autoFocus
            margin="dense"
            label="Rating"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e)=>setRating(e.target.value)}
          />
          <TextField
            id="releaseDate"
            autoFocus
            margin="dense"
            label="Release Date"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e)=>setReleaseDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => addMovie()}>Add Movie</Button>
        </DialogActions>
      </Dialog>
      </Box>

    </Box>
  );
};

export default App;
