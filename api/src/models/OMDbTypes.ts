export const OMDbSearchTypeValues = ["movie" , "series" , "episode"] as const;
export type OMDbSearchType = typeof OMDbSearchTypeValues[number];