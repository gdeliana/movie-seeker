import { IMovieSearchQuery } from "../models/IApiSearchQuery.model";
import {
  IOMDbSearchResults,
  OMDBApiResponse,
  ApiResponse
} from "../models/IApiSearchResults.model";
import escapeHtml from "../helpers/escapeHtml.helper";
import { OMDB_API, OMDB_KEY } from "../config/api.config";
import { OMDbSearchTypeValues } from "../models/OMDbTypes";
import { setKey, getKey } from "../services/redis.service";
import axios from "axios";

export const OMDbSearch = (
  query: IMovieSearchQuery
): Promise<ApiResponse> => {
  let { title, type, year, page } = query;
  return new Promise(async (a, r) => {
    const query: string[] = [];

    if (title && title.trim() != "") query.push(`s=${escapeHtml(title.trim())}`);

    if (type && OMDbSearchTypeValues.includes(type))
      query.push(`type=${escapeHtml(type)}`);

    if (year && year > 0) query.push(`y=${year}`);

    if (query.length == 0) {
      r("No query params provided");
      return;
    }

    query.push(`page=${page && page > 0 ? page : 1}`)

    let query_str = query.join("&");
    const redis_result = await getKey(query_str);
    
    if (redis_result) {
      console.log("cached result");
      a(JSON.parse(redis_result) as ApiResponse);
      return;
    }
    const response = await axios.get(
      `${OMDB_API}?${query_str}&apikey=${OMDB_KEY}&plot=full`
    );
    const results = response.data as OMDBApiResponse;
    if (results.Response === "True" && results.Search) {
      const ret:ApiResponse = {
        movies: results.Search,
        total: Number(results.totalResults) > 0 ? Number(results.totalResults) : 0,
      }
      await setKey(query_str, JSON.stringify(ret));
      a(ret);
    } else if (results.Error) {
      r(results.Error);
    } else {
      r("No results");
    }
  });
};
