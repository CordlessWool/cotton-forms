import type { AnyRecord } from "@cotton-forms/common";
import * as crypto from "crypto";

export function compare(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function createDataHash(data: AnyRecord): string {
  return crypto.createHash("sha1").update(JSON.stringify(data)).digest("hex");
}

export function getInaccurateTimestamp(factorInSeconds: number = 1): number {
  return Math.floor(Date.now() / (1000 * factorInSeconds)) * factorInSeconds;
}

export function pick<T extends AnyRecord, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => ({ ...acc, [key]: obj[key] }),
    {} as Pick<T, K>,
  );
}

export function createUniquenessHash(
  data: AnyRecord,
  formId: string,
  uniqueKeys?: string[],
): string {
  if (!uniqueKeys) {
    return createDataHash({
      createdAt: getInaccurateTimestamp(10),
      formId,
      data,
    });
  }
  const pickedData = pick(data, uniqueKeys);
  return createDataHash({
    formId,
    data: pickedData,
  });
}
