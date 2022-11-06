import { SearchType } from "./SearchType"

export default interface SearchResult {
	Title: string
	Year: string
	imdbID: string
	Type: SearchType,
	Poster: string
}
