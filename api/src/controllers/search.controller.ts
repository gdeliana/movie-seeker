import { IMovieSearchQuery } from "../models/IApiSearchQuery.model";
import { Request, Response } from "express";
import { OMDbSearch } from "../services/omdb.service";
import { ApiResponse } from "../models/IApiSearchResults.model";

export const SearchController = async (
  req: Request<{}, {}, {}, IMovieSearchQuery>,
  res: Response<ApiResponse & {error:string}>
) => {
  try {
    const {movies, total} = await OMDbSearch(req.query);
    res.json({
      movies,
      total,
      error: "",
    });
  } catch (e) {
    res.json({
      movies: [],
      total: 0,
      error: (e instanceof Error ? e.message : typeof e === 'string' ? e : "An error occurred."),
    });
  }
};
