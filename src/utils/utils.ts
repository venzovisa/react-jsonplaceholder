export enum systemMessages {
  MAX_LENGTH = "Max length reached",
  GENERAL_ERROR = "Something went wrong. Please try again later.",
}

export const baseUrl =
  import.meta.env.VITE_API || "https://jsonplaceholder.typicode.com";
