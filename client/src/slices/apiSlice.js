import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getCsrfToken = () => {
  // set 'XSRF-TOKEN'
  return Cookies.get("XSRF-TOKEN");
};

const baseQuery = fetchBaseQuery({
  baseUrl: "server endpoint",
  credentials: "include", // Necessary for cookies to be included
  prepareHeaders: (headers) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      // Set the CSRF token in the request headers
      headers.set("x-csrf-token", csrfToken);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
