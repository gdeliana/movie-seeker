import { OMDbSearchType } from "./OMDbTypes"
export interface IOMDbSearchResult {
	Title: string
	Year: string
	imdbID: string
	Type: OMDbSearchType,
	Poster: string
}
export interface OMDBApiResponse {
	Search?: IOMDbSearchResult[]
	Response: "True" | "False"
	Error?: string
	totalResults?: number
}
export interface ApiResponse {
	movies: IOMDbSearchResult[],
	total: number
}
export type IOMDbSearchResults = IOMDbSearchResult[]