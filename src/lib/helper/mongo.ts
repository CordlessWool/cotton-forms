import type { InsertOneResult, UpdateResult } from "mongodb";

export const mongo = {
  result: {
    insertOne: (result: InsertOneResult) => {
      if (!result.insertedId) {
        return null;
      }
      return result.insertedId.toString();
    },
  },
};
