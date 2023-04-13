import { LocaleObject } from "yup";

const mixed: LocaleObject["mixed"] = {
  default: "${path} tidak valid.",
  required: "Kolom ini wajib diisi",
  oneOf: "${path} tidak valid",
  notOneOf: "${path} tidak valid",
  notType: ({ path, type, value, originalValue }: any) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `${path} harus merupakan tipe \`${type}\`, ` +
      `tetapi nilai akhir adalah: \`${value}\`` +
      (isCast ? ` (dilemparkan dari nilai \`${originalValue}\`).` : ".");

    if (value === null) {
      msg +=
        `\n Jika "null" dimaksudkan sebagai nilai kosong, pastikan untuk menandai skema sebagai` +
        " `.nullable()`";
    }

    return msg;
  },
};

const string: LocaleObject["string"] = {
  length: "${path} harus persis ${length} karakter",
  min: "${path} harus setidaknya ${min} karakter",
  max: "${path} harus paling banyak ${max} karakter",
  matches: '${path} harus cocok dengan yang berikut: "${regex}"',
  email: "${path} harus merupakan email yang valid",
  url: "${path} harus merupakan url yang valid",
  trim: "${path} harus merupakan string yang dipangkas",
  lowercase: "${path} harus merupakan lowercase",
  uppercase: "${path} harus merupakan uppercase",
};

const number: LocaleObject["number"] = {
  min: "${path} harus lebih besar dari atau sama dengan ${min}",
  max: "${path} harus kurang dari atau sama dengan ${max}",
  lessThan: "${path} harus kurang dari ${less}",
  moreThan: "${path} harus lebih besar dari ${more}",
  positive: "${path} harus merupakan bilangan positif",
  negative: "${path} harus merupakan bilangan negatif",
  integer: "${path} harus merupakan bilangan bulat",
};

const date: LocaleObject["date"] = {
  min: "${path} harus lebih lambat dari ${min}",
  max: "${path} harus lebih awal dari ${max}",
};

const boolean: LocaleObject["boolean"] = {};

const object: LocaleObject["object"] = {
  noUnknown:
    "${path} tidak dapat memiliki kunci yang tidak ditentukan dalam bentuk objek",
};

const array: LocaleObject["array"] = {
  min: "${path} harus memiliki setidaknya ${min} item",
  max: "${path} harus memiliki kurang dari atau sama dengan item ${max}",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mixed,
  string,
  number,
  date,
  boolean,
  object,
  array,
};
