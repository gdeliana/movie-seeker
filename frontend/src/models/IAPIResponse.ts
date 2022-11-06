
import ISearchResult from "./ISearchResult"

export default interface IApiResponse {
	movies: ISearchResult[];
	total: number;
	error: string
}