export const SearchTypeValues = ["movie" , "series" , "episode"] as const;
export type SearchType = typeof SearchTypeValues[number];