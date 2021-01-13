import { Attendance } from "@domain/Attendance";
import { AttendanceGraph } from "@ds/AttendanceGraph";

describe("Test for Graph", () => {
  test("add vertex", () => {
    const graph = new AttendanceGraph();
    graph.addVertex("ilias");

    const connections = new Map();
    connections.set("ilias", new Map());

    expect(graph.connections).toEqual(connections);
  });

  test("add connections between edges", () => {
    const graph = new AttendanceGraph();
    graph.addEdge("ilias", "shabana");

    const connections = new Map();
    connections.set("ilias", new Map().set("shabana", 1));
    connections.set("shabana", new Map().set("ilias", 1));

    expect(graph.connections).toEqual(connections);
  });

  test("increasing the weight of the adjacent edge", () => {
    const graph = new AttendanceGraph();
    graph.addEdge("ilias", "shabana");
    graph.addEdge("ilias", "shabana");

    const connections = new Map();
    connections.set("ilias", new Map().set("shabana", 2));
    connections.set("shabana", new Map().set("ilias", 2));

    expect(graph.connections).toEqual(connections);
  });

  test("print connections table", () => {
    const graph = new AttendanceGraph();
    graph.addEdge("ilias", "shabana");
    graph.addEdge("ilias", "shabana");

    expect(graph.printConnectionTable()).toBe(
      "ilias,shabana,2\r\nshabana,ilias,2"
    );
  });

  test("Connect edges by overlapping shift on the same date", () => {
    const graph = new AttendanceGraph();

    graph.connectEdgesByOverlappingShift(
      [
        {
          date: "5/01/2021",
          shift: "3pm - 6pm",
          volunteerId: "146",
          volunteerName: "Bobita",
          shiftReason: "Regular shift",
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
        {
          date: "5/01/2021",
          shift: "9pm - 12am",
          volunteerId: "13",
          volunteerName: "Shabana",
          shiftReason: "Make up shift",
        },
      ].map((attendance) => new Attendance(attendance))
    );

    expect(graph.connections.get("Bobita")?.has("Rajjak")).toBeTruthy();
    expect(graph.connections.get("Bobita")?.get("Rajjak")).toBe(1);

    expect(graph.connections.get("Bobita")?.has("Kabori")).toBeTruthy();
    expect(graph.connections.get("Bobita")?.get("Kabori")).toBe(1);

    expect(graph.connections.get("Rajjak")?.has("Bobita")).toBeTruthy();
    expect(graph.connections.get("Rajjak")?.get("Bobita")).toBe(1);

    expect(graph.connections.get("Rajjak")?.has("Kabori")).toBeTruthy();
    expect(graph.connections.get("Rajjak")?.get("Kabori")).toBe(1);

    expect(graph.connections.get("Kabori")?.has("Rajjak")).toBeTruthy();
    expect(graph.connections.get("Kabori")?.get("Rajjak")).toBe(1);

    expect(graph.connections.get("Kabori")?.has("Bobita")).toBeTruthy();
    expect(graph.connections.get("Kabori")?.get("Bobita")).toBe(1);

    expect(graph.connections.get("Shabana")).toBeUndefined();
  });

  test("print connections table more abstract", () => {
    const graph = new AttendanceGraph();
    graph.connectEdgesByOverlappingShift(
      [
        {
          date: "5/01/2021",
          shift: "3pm - 6pm",
          volunteerId: "146",
          volunteerName: "Bobita",
          shiftReason: "Regular shift",
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
        {
          date: "5/01/2021",
          shift: "9pm - 12am",
          volunteerId: "13",
          volunteerName: "Shabana",
          shiftReason: "Make up shift",
        },
      ].map((attendance) => new Attendance(attendance))
    );

    const table = graph.printConnectionTable();

    expect(table).toBe(
      "Bobita,Rajjak,1\r\nBobita,Kabori,1\r\nRajjak,Bobita,1\r\nRajjak,Kabori,1\r\nKabori,Bobita,1\r\nKabori,Rajjak,1"
    );
  });
});
