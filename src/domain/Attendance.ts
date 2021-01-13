import { IAttendance } from "@src/types";
import { CONNECTIONS_TABLE_HEADER } from "@constants/fileConstants";
import {
  writeToCsv,
  readCsvFile,
  parseCsvDataInto,
  readCsvFileAsStream,
} from "@src/api/fileApi";

export class Attendance {
  constructor(private _data: IAttendance) {}

  get raw() {
    return JSON.parse(JSON.stringify(this._data));
  }

  get date() {
    return this._data.date;
  }

  get shift() {
    return this._data.shift;
  }

  get volunteerName() {
    return this._data.volunteerName;
  }

  public isPreviousShiftTo(attendance: Attendance) {
    return this.date === attendance.date && this.shift < attendance.shift;
  }

  public hasOverlappingShift(attendance: Attendance) {
    return this.date === attendance.date && this.shift === attendance.shift;
  }

  /**
   * @description sorts attendace data by same date and shift of volunteer
   * @param {Array<IAttendance>} rows
   * @return {Array<Attendance>}
   */
  static sortByDateAndShift = (rows: IAttendance[]) => {
    const attendances: Array<Attendance> = [];
    const convertedRows = rows.map((data) => new Attendance(data));

    convertedRows.forEach((currentAttendance) => {
      if (!attendances.length) {
        attendances.push(currentAttendance);
      } else {
        const lastAttendance = attendances[attendances.length - 1];
        if (currentAttendance.isPreviousShiftTo(lastAttendance)) {
          attendances[attendances.length - 1] = currentAttendance;
          attendances.push(lastAttendance);
        } else {
          attendances.push(currentAttendance);
        }
      }
    });

    return attendances;
  };

  /**
   * @description reads csv file as stream to get attendance data
   * @param {string} filepath
   * @dependson Attendance.sortByDateAndShift
   */
  static getDataFromFileStream = async (filepath: string) => {
    try {
      const attendanceCsvData = await readCsvFileAsStream(filepath);

      const parsedAttendaceData = parseCsvDataInto<IAttendance>(
        attendanceCsvData,
        ([date, shift, volunteerId, volunteerName, shiftReason]) => ({
          date,
          shift,
          volunteerId,
          volunteerName,
          shiftReason,
        })
      );

      return Attendance.sortByDateAndShift(parsedAttendaceData);
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description reads csv file to get attendance data
   * @param {string} filepath
   * @dependson sortByDateAndShift
   */
  static getDataFromFile = async (filepath: string) => {
    try {
      const attendanceCsvData = await readCsvFile(filepath);

      const parsedAttendaceData = parseCsvDataInto<IAttendance>(
        attendanceCsvData,
        ([date, shift, volunteerId, volunteerName, shiftReason]) => ({
          date,
          shift,
          volunteerId,
          volunteerName,
          shiftReason,
        })
      );

      return Attendance.sortByDateAndShift(parsedAttendaceData);
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description writes the overlapped shift connection of volunteers to a csv file
   * @param {string} filepath
   * @param {string} connectionTable
   */
  static printConnectionsToCsvFile = async (
    filepath: string,
    connectionTable: string
  ) => {
    try {
      await writeToCsv(filepath, CONNECTIONS_TABLE_HEADER, connectionTable);
    } catch (error) {
      throw error;
    }
  };
}
