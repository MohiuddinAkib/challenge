import { AbsTractBaseGraph } from "@ds/Graph";
import { Attendance } from "@domain/Attendance";

export class AttendanceGraph extends AbsTractBaseGraph<
  string,
  Map<string, number>
> {
  public addVertex(vertex: string) {
    if (!this._adjacencyList.has(vertex))
      this._adjacencyList.set(vertex, new Map());
  }

  public addEdge(v1: string, v2: string) {
    if (!this._adjacencyList.has(v1)) {
      this.addVertex(v1);
    }

    if (!this._adjacencyList.has(v2)) {
      this.addVertex(v2);
    }

    const vertex1 = this._adjacencyList.get(v1)!;
    const vertex2 = this._adjacencyList.get(v2)!;

    const vertex2Weight = vertex1.has(v2) ? vertex1.get(v2)! + 1 : 1;
    const vertex1Weight = vertex2.has(v1) ? vertex2.get(v1)! + 1 : 1;

    vertex1.set(v2, vertex2Weight);
    vertex2.set(v1, vertex1Weight);
  }

  /**
   * @description Connectes the edges based on the shift overlap
   * @param {Attendance[]} convertedRows sorted by same date and shift
   */
  connectEdgesByOverlappingShift = (convertedRows: Attendance[]) => {
    for (let rowIndex = 0; rowIndex < convertedRows.length; rowIndex++) {
      const row = convertedRows[rowIndex];
      for (
        let j = rowIndex + 1;
        j < convertedRows.length && row.hasOverlappingShift(convertedRows[j]);
        j++
      ) {
        this.addEdge(row.volunteerName, convertedRows[j].volunteerName);
      }
    }
  };

  printConnectionTable() {
    let data = "";

    this.connections.forEach((neighbors, node1) => {
      neighbors.forEach((weight, node2) => {
        data = data.concat(node1, ",", node2, ",", weight.toString(), "\r\n");
      });
    });

    return data.trim();
  }
}
