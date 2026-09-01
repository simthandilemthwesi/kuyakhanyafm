import { liteClient as algoliasearch } from "algoliasearch/lite";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

export const searchClient =
  appId && searchKey
    ? algoliasearch(appId, searchKey)
    : null;

export const ALGOLIA_INDEX = "KUYAKHANYA_FM";
