import path from "path";
import "./path-alias";

import { Attendance } from "@domain/Attendance";
import { AttendanceGraph } from "@ds/AttendanceGraph";
import {
  ATTENDANCE_FILE,
  ATTENDANCE_OUTPUT_FILE,
} from "@constants/fileConstants";

async function main() {
  try {
    const attendanceData = await Attendance.getDataFromFile(
      path.join(process.cwd(), "files", ATTENDANCE_FILE)
    );
    const graph = new AttendanceGraph();
    graph.connectEdgesByOverlappingShift(attendanceData);
    const table = graph.printConnectionTable();
    await Attendance.printConnectionsToCsvFile(
      path.join(process.cwd(), "files", ATTENDANCE_OUTPUT_FILE),
      table
    );
  } catch (error) {
    console.error(error);
  }
}

main();
