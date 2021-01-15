import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";

/**
 * @description reads csv file as stream and return data
 * @param {string} filepath
 * @param {(data: Array<Attendance>) => void} onData
 * @param {() => void} onComplete
 * @param {(error: Error) => void} onError
 */
export const readCsvFileAsStream = (
  filepath: string,
  onData: (data: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) => {
  const readStream = createReadStream(filepath, {
    encoding: "utf-8",
  });

  readStream.on("data", (csvData) => onData(csvData.toString().trim()));

  readStream.on("end", onComplete);

  readStream.on("error", onError);
};

/**
 * @description reads csv file a return data
 * @param {string} filepath
 */
export const readCsvFile = async (filepath: string) => {
  try {
    const data = await fs.readFile(filepath, {
      encoding: "utf-8",
    });

    return data.trim();
  } catch (error) {
    throw error;
  }
};

/**
 * @description parse csv data
 * @param {string} data
 */
export const parseCsvDataInto = <T>(
  data: string,
  callback: (row: string[]) => T
) => {
  const rows = data.split("\r\n");
  rows.shift();

  return rows.map((row) => {
    return callback(row.split(","));
  });
};

export const writeToCsv = async (
  filename: string,
  header: string,
  data: string
) => {
  try {
    const formatteddata = header.concat("\r\n", data);
    return fs.writeFile(filename, formatteddata, {
      encoding: "utf-8",
    });
  } catch (error) {
    throw error;
  }
};
