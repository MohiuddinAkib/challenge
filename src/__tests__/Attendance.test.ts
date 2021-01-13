import { Attendance } from "@domain/Attendance";

describe("Test for Attendance domain", () => {
  test("sort attendances data by date and shift", async () => {
    const sorted = Attendance.sortByDateAndShift([
      {
        date: "5/01/2021",
        shift: "3pm - 6pm",
        volunteerId: "146",
        volunteerName: "Bobita",
        shiftReason: "Regular shift",
      },
      {
        date: "5/01/2021",
        shift: "9pm - 12am",
        volunteerId: "13",
        volunteerName: "Shabana",
        shiftReason: "Make up shift",
      },
      {
        date: "5/01/2021",
        shift: "3pm - 6pm",
        volunteerId: "210",
        volunteerName: "Rajjak",
        shiftReason: "Dropping by",
      },
      {
        date: "5/01/2021",
        shift: "3pm - 6pm",
        volunteerId: "22",
        volunteerName: "Kabori",
        shiftReason: "Dropping by",
      },
    ]);
    expect(sorted[0] instanceof Attendance).toBeTruthy();

    expect(sorted[0].raw).toEqual({
      date: "5/01/2021",
      shift: "3pm - 6pm",
      volunteerId: "146",
      volunteerName: "Bobita",
      shiftReason: "Regular shift",
    });
    expect(sorted[1].raw).not.toEqual({
      date: "5/01/2021",
      shift: "9pm - 12am",
      volunteerId: "13",
      volunteerName: "Shabana",
      shiftReason: "Make up shift",
    });
    expect(sorted[1].raw).toEqual({
      date: "5/01/2021",
      shift: "3pm - 6pm",
      volunteerId: "210",
      volunteerName: "Rajjak",
      shiftReason: "Dropping by",
    });
    expect(sorted[2].raw).toEqual({
      date: "5/01/2021",
      shift: "3pm - 6pm",
      volunteerId: "22",
      volunteerName: "Kabori",
      shiftReason: "Dropping by",
    });
    expect(sorted[3].raw).toEqual({
      date: "5/01/2021",
      shift: "9pm - 12am",
      volunteerId: "13",
      volunteerName: "Shabana",
      shiftReason: "Make up shift",
    });
  });
});
