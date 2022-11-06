import { OMDbSearchType } from "./OMDbTypes";
export interface IMovieSearchQuery {
	title?: string;
	type?: OMDbSearchType;
	year?: number;
	page?: number;
}