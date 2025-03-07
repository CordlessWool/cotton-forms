import { default as en } from "./en";

export const getLanguage = (lang: string) => {
  switch (lang) {
    case "en":
      return en;
    default:
      return en;
  }
};
