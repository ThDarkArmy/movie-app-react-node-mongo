import React, {useState} from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";


import axios from "axios";

const BASE_URL = "http://localhost:4532/movies";

const MovieItem = ({ movie }) => {
  const deleteMovie = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: BASE_URL + "/" + movie._id,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(res.data){
          alert("Movie deleted successfully")
      }
    } catch (err) {
      console.log(err);
      alert(err)
    }
  };

  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [rating, setRating] = useState();

  const updateMovie = async () => {
    try {
      const movieData = {
        name: name,
        releaseDate: releaseDate,
        rating: rating,
      };

      console.log(movieData)

      if (name!==undefined && releaseDate!=undefined && rating!==undefined) {
        const res = await axios({
          method: "put",
          url: BASE_URL+"/"+movie._id,
          data: JSON.stringify(movieData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          alert("Movie updated successfully");
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
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Name: {movie.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Rating: {movie.rating}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Release Date: {movie.releaseDate}
          </Typography>
        </CardContent>

        <CardActions>
          <Button onClick={() => setOpen(true)} size="small">
            Edit
          </Button>
          <Button onClick={() => deleteMovie()} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open}>
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
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="rating"
            autoFocus
            margin="dense"
            label="Rating"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setRating(e.target.value)}
          />
          <TextField
            id="releaseDate"
            autoFocus
            margin="dense"
            label="Release Date"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => updateMovie()}>Update Movie</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MovieItem;
