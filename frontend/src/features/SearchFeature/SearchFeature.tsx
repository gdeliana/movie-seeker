import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import css from "./SearchFeature.module.css";
import CustomTextField from "../../components/CustomTextField";
import { useEffect, useState } from "react";
import { SearchType, SearchTypeValues } from "../../models/SearchType";
import { searchMoviesThunk } from "./store/search.slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import IApiRequest from "../../models/IAPIRequest";
import MovieResultCard from "../../components/MovieResultCard/MovieResultCard";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface ISelectItem {
  value: string;
  label: string;
}

const SearchTypeItems = ["", ...SearchTypeValues].map((item) => ({
  label:
    item !== "" ? `${item.charAt(0).toUpperCase()}${item.slice(1)}` : "None",
  value: item,
}));

const perPageItems = 10;
let t: NodeJS.Timeout;


const SearchFeature = () => {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<SearchType | "">("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { movies, total, error } = useAppSelector(({ search }) => {
    return {
      movies: search.movies,
      total: search.total,
      error: search.error,
    };
  });
  const loading = useAppSelector(({ search }) => search.loading);
  const dispatch = useAppDispatch();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const searchMovies = (page: number) => {
    const searchParams: IApiRequest = {
      title,
      year: Number(year),
      page,
    };
    if (type !== "") {
      searchParams["type"] = type;
    }
    dispatch(searchMoviesThunk(searchParams));
  };

  useEffect(() => {
    clearTimeout(t);
    t = setTimeout(() => {
      searchMovies(1);
      setPage(1)
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [title, year]);

  useEffect(() => {
    searchMovies(1);
    setPage(1)
  }, [type]);

  useEffect(() => {
    searchMovies(page);
  }, [page]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / perPageItems));
  }, [total]);

  return (
    <Box className={css.box}>
      <Grid spacing={4} container>
        <Grid item container direction="column" xs={12} sm={4} md={3} xl={2}>
          <form>
            <CustomTextField
              className={css.control}
              type="text"
              id="title"
              value={title}
              setparentvalue={setTitle}
              label="Title"
            />
            <CustomTextField
              className={css.control}
              type="number"
              id="year"
              value={year}
              setparentvalue={setYear}
              label="Year"
              disabled={title.trim() === ""}
            />
            <FormControl disabled={title.trim() === ""} fullWidth>
              <InputLabel id={`type-label`}>Type</InputLabel>
              <Select
                labelId={`type-label`}
                id="type"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value as SearchType | "")}
              >
                {SearchTypeItems.map((item: ISelectItem) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </Grid>
        <Grid
          spacing={3}
          container
          direction="row"
          item
          xs={12}
          sm={8}
          md={9}
          xl={10}
        >
          <Grid item container alignItems="stretch" spacing={2} direction="row">
            {loading ? (
              Array.from(Array(10).keys()).map((i) => (
                <Grid key={i} item xs={12} sm={2} md={4} xl={3}>
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Grid>
              ))
            ) : error !== "" ? (
              <Grid item xs={12}>
                <Typography variant="body1" component="p">
                  There was an error displaying the movies.
                </Typography>
                <Typography variant="body1" component="p">
                  {error}
                </Typography>
              </Grid>
            ) : total === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" component="p">
                  There are no items to display. Please refine your search
                </Typography>
              </Grid>
            ) : (
              movies.map((movie) => (
                <Grid key={movie.imdbID} item xs={12} sm={2} md={4} xl={3}>
                  <MovieResultCard {...movie} />
                </Grid>
              ))
            )}
          </Grid>

          {totalPages > 1 && (
            <Grid item container direction="row">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                className={css.pagination}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchFeature;
