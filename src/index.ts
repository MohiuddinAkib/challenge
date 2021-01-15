import path from "path";
import "./path-alias";

import { Attendance } from "@domain/Attendance";
import { AttendanceGraph } from "@ds/AttendanceGraph";
import {
  ATTENDANCE_FILE,
  ATTENDANCE_OUTPUT_FILE,
} from "@constants/fileConstants";

const graph = new AttendanceGraph();

const addAttendanceDataToGraph = (attendanceData: Attendance[]) => {
  graph.connectEdgesByOverlappingShift(attendanceData);
};

const onReadingError = (error: Error) => {
  console.error(error);
};

const writeAttendanceDataToCsv = async () => {
  try {
    const table = graph.printConnectionTable();

    await Attendance.printConnectionsToCsvFile(
      path.join(process.cwd(), "files", ATTENDANCE_OUTPUT_FILE),
      table
    );
  } catch (error) {
    throw error;
  }
};

function main() {
  try {
    Attendance.getDataFromFileStream(
      path.join(process.cwd(), "files", ATTENDANCE_FILE),
      addAttendanceDataToGraph,
      writeAttendanceDataToCsv,
      onReadingError
    );
  } catch (error) {
    console.error(error);
  }
}

main();
