import { SearchType } from "./SearchType"
export default interface IApiRequest {
	title: string;
	year?: number;
	type?: SearchType;
	page?: number;
}