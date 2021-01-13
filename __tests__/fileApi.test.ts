import path from "path";
import { Attendance } from "@domain/Attendance";
import {
  ATTENDANCE_FILE,
  ATTENDANCE_OUTPUT_FILE,
} from "@constants/fileConstants";
import {
  parseCsvDataInto,
  readCsvFile,
  readCsvFileAsStream,
  writeToCsv,
} from "@api/fileApi";

const CSV_DATA =
  "date,shift,volunteerId,volunteerName,shiftReason\r\n5/01/2021,3pm - 6pm,146,Bobita,Regular shift\r\n5/01/2021,9pm - 12am,13,Shabana,Make up shift\r\n5/01/2021,3pm - 6pm,210,Rajjak,Dropping by\r\n5/01/2021,3pm - 6pm,22,Kabori,Dropping by";

describe("test for fileApi", () => {
  test("read attendance file", async () => {
    const data = await readCsvFile(path.join(__dirname, ATTENDANCE_FILE));

    expect(data).not.toBe("");
    expect(data.length).not.toBeFalsy();
    expect(data).toEqual(CSV_DATA);
  });

  test("parse csv data", () => {
    const parsed = parseCsvDataInto(
      CSV_DATA,
      ([date, shift, volunteerId, volunteerName, shiftReason]) => ({
        date,
        shift,
        volunteerId,
        volunteerName,
        shiftReason,
      })
    );

    expect(Array.isArray(parsed)).toBeTruthy();
    expect(parsed.length).toBe(4);
    expect(Array.isArray(parsed[0])).toBeFalsy();
    expect(parsed[0] instanceof Attendance).toBeFalsy();
    expect(parsed[0] instanceof Object).toBeTruthy();
    expect(parsed[0]).toEqual({
      date: "5/01/2021",
      shift: "3pm - 6pm",
      volunteerId: "146",
      volunteerName: "Bobita",
      shiftReason: "Regular shift",
    });
    expect(parsed[1]).toEqual({
      date: "5/01/2021",
      shift: "9pm - 12am",
      volunteerId: "13",
      volunteerName: "Shabana",
      shiftReason: "Make up shift",
    });
    expect(parsed[3]).not.toEqual({
      date: "5/01/2021",
      shift: "9pm - 12am",
      volunteerId: "13",
      volunteerName: "Shabana",
      shiftReason: "Make up shift",
    });
  });

  test("write to csv file", async () => {
    const outputFile = path.join(__dirname, ATTENDANCE_OUTPUT_FILE);
    const headers = "node1,node2,weight";
    const mockData =
      "Bobita,Rajjak,1\r\nBobita,Kabori,1\r\nRajjak,Bobita,1\r\nRajjak,Kabori,1\r\nKabori,Bobita,1\r\nKabori,Rajjak,1";
    await writeToCsv(outputFile, headers, mockData);

    const data = await readCsvFile(outputFile);
    expect(data).toBe(headers.concat("\r\n", mockData));
  });

  test.only("read csv file as stream", async () => {
    const data = await readCsvFileAsStream(
      path.join(__dirname, ATTENDANCE_FILE)
    );

    expect(data).not.toBe("");
    expect(data.length).not.toBeFalsy();
    expect(data).toEqual(CSV_DATA);
  });
});
