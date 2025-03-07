import type { AnyRecord } from "../../lib/types";
import * as v from "valibot";
import type { FieldDate, FieldNumber, Fields, FieldText } from "./form/index";

const EmailSchema = v.pipe(v.string(), v.trim(), v.email());
const BooleanSchema = v.boolean();
const URLSchema = v.pipe(v.string(), v.trim(), v.url());
const ColorSchema = v.pipe(v.string(), v.trim(), v.hexColor());

export const validateText = (value: unknown, def: FieldText) => {
  return v.safeParse(
    v.pipe(
      v.string(),
      v.trim(),
      v.check((text) => {
        if (def.minLength && text.length < def.minLength) {
          return false;
        }
        return true;
      }),
      v.check((text) => {
        if (def.maxLength && text.length > def.maxLength) {
          return false;
        }
        return true;
      }),
    ),
    value,
  );
};

export const validateNumber = (value: unknown, def: FieldNumber) => {
  return v.safeParse(
    v.pipe(
      v.number(),
      v.check((number) => {
        if (def.min && number < def.min) {
          return false;
        }
        return true;
      }),
      v.check((number) => {
        if (def.max && number > def.max) {
          return false;
        }
        return true;
      }),
    ),
    value,
  );
};

export const validateBoolean = (value: unknown) => {
  return v.safeParse(BooleanSchema, value);
};

export const validateColor = (value: unknown) => {
  return v.safeParse(ColorSchema, value);
};

export const validateEmail = (value: unknown) => {
  return v.safeParse(EmailSchema, value);
};

export const validateURL = (value: unknown) => {
  return v.safeParse(URLSchema, value);
};

export const validateDate = (value: unknown, def: FieldDate) => {
  return v.safeParse(
    v.pipe(
      v.date(),
      v.check((date) => {
        if (def.min && date < def.min) {
          return false;
        }
        return true;
      }),
      v.check((date) => {
        if (def.max && date > def.max) {
          return false;
        }
        return true;
      }),
    ),
    value,
  );
};

export interface ValidateFormReturn {
  data: AnyRecord;
  valid: boolean;
  errors?: Record<string, string[]> | undefined;
}

export const validateForm = (
  formData: AnyRecord,
  definitions: Fields[] | undefined | null,
): ValidateFormReturn => {
  if (!definitions) {
    return { valid: true, data: formData };
  }
  return definitions
    .map((def) => {
      if (def.name in formData) {
        const value = formData[def.name];
        switch (def.type) {
          case "text":
            return [def.name, validateText(value, def)] as const;
          case "number":
            return [def.name, validateNumber(value, def)] as const;
          case "boolean":
            return [def.name, validateBoolean(value)] as const;
          case "color":
            return [def.name, validateColor(value)] as const;
          case "email":
            return [def.name, validateEmail(value)] as const;
          case "url":
            return [def.name, validateURL(value)] as const;
          case "date":
            return [def.name, validateDate(value, def)] as const;
        }
      } else if (def.required) {
        return [
          def.name,
          { success: false, issues: [`Field ${def.name} is required`] },
        ] as const;
      }

      return [def.name, { success: true }] as const;
    })
    .reduce(
      (acc, [name, res]): ValidateFormReturn => {
        if (res.success && "output" in res) {
          return {
            ...acc,
            data: {
              ...(acc.data || {}),
              [name]: res.output,
            },
          };
        } else if ("issues" in res && Array.isArray(res.issues)) {
          return {
            ...acc,
            valid: false,
            errors: {
              ...(acc.errors || {}),
              [name]: res.issues.map((issue) => issue.toString()),
            },
          };
        }
        return acc;
      },
      { valid: true } as ValidateFormReturn,
    );
};
