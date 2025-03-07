import type { AnyRecord } from "@cotton-forms/common";
import type { WithId } from "mongodb";

export const dataToMongodb = <I extends AnyRecord>(data: I) => {
  const { id, ...doc } = data;
  if (!id) {
    return doc;
  }
  return { _id: new Object(id), ...doc };
};

export const mongoDbToData = <I extends WithId<AnyRecord>>(data: I) => {
  const { _id, _v, ...doc } = data;
  return { id: _id.toString(), ...doc };
};

export interface PaginationOptions {
  page?: number;
  size?: number;
}

export const getPagination = (options: PaginationOptions) => {
  const page = options.page || 1;
  const limit = options.size || 10;
  const skip = (page - 1) * limit;
  return { skip, limit };
};
