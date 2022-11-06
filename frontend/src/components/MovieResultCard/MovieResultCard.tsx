import ISearchResult from "../../models/ISearchResult";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea } from "@mui/material";
import css from "./MovieResultCard.module.css";

const MovieResultCard: React.FC<ISearchResult> = (props) => {
  return (
    <Card className={css.Card} sx={{ maxWidth: 345 }}>
      <CardActionArea className={css.Card}>
        <CardMedia
          component="img"
          height="140"
          image={props.Poster}
          alt={props.Title}
        />
        <CardContent className={css.CardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {props.Title} - {props.Year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.Type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieResultCard;
