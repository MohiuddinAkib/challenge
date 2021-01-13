## **Representation of the volunteer network (adjacency matrix):**
---
&nbsp;
Adjacency matrix is easy to represent the edges and weight between the vertices

|           | Ilias | Rajjak | Shabana | Bobita | Kabori |
|-----------|:-----:|:------:|:-------:|:------:|:------:|
|**Ilias**  |   0   |    1   |    2    |    0   |    1   |
|**Rajjak** |   1   |    0   |    0    |    1   |    1   |
|**Shabana**|   2   |    0   |    0    |    0   |    2   |
|**Bobita** |   0   |    1   |    0    |    0   |    2   |
|**Kabori** |   1   |    1   |    2    |    2   |    0   |

&nbsp;
## **Representation of the volunteer network (adjacency list):**
---
&nbsp;
Adjacency matrix is memory efficient to store the connections and faster to access

```typescript
    [
        Ilias      [[Rajjak, 1], [Shabana, 2],[Kabori, 1]],
        Rajjak     [[Ilias, 1], [Bobita, 2],[Kabori, 1]],
        Shabana    [[Ilias, 2], [Kabori, 2]],
        Bobita     [[Rajjak, 1], [Kabori, 2]],
        Kabori     [[Ilias, 1], [[Rajjak, 1], [Shabana, 2],[Bobita, 2]],
    ]
```

&nbsp;
## **My Approaches to solve the problem:**
---
- To be able to efficiently read the CSV without cluttering the thread usage of stream to read the data as small chunks.
- Join the chunks into a single data and parse it into array of object with the headers of the CSV being the keys
- The data is already sorted by the date. So sort those again by the shift on the same day; It is linear in complexity
- From the sorted data find the nodes and connections between them
- Store those connection and nodes in a Graph
- When theres more than one connection between two vertices increase the weight of the connection
- Generate connections table from the Graph data
- Add header to the generated table
- Then write the connection table with the header into an output CSV file



&nbsp;
## **Psudo code of finding the nodes and connections:**
---

```{r, tidy=FALSE, eval=FALSE, highlight=FALSE }

for eachRow of attendanceData do
    initialize j = index of eachRow + 1

    while eachRow has overlapping shift with rows[j] do
        graph.addEdge(eachRow.volunteerName, rows[j].volunteerName);

        increase j
    end;
end;

```

&nbsp;
## **My adjacency list tweak to add weight:**
---
As Adjacecny list is efficient in comparison to adjacency matrix it's used in this implementaion of Graph. Then to store the neighbours of a vertex  the name (string) property of the vertex is used as identifier but that can't be used as index of our adjacency list. That's why JS map is used to overcome this limitation. Then again the neighbours of each vertex are also implemented with **Map** as list. **Array** implementation of neighbour list would require iteration to find a neighbour and increase it's weight. It would add O(N) complexity. With **Map** implementation it's now **0(1)**. As a result increasing the weight of a neighbour takes O(1) complexity.

&nbsp;
## **Complexity:**
---
Complexity of sorting the attendance data by shift on same date
```typescript
const attendances: Array<Attendance> = [];
const convertedRows = rows.map((data) => new Attendance(data));

convertedRows.forEach((currentAttendance) => { // O(N)
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

// Total is 0(N * E)


```

Complexity of finding edges and connections:
```typescript
 for (let rowIndex = 0; rowIndex < convertedRows.length; rowIndex++) { // O(N)
    const row = convertedRows[rowIndex];
    for (
    let j = rowIndex + 1;
    j < convertedRows.length && row.hasOverlappingShift(convertedRows[j]);
    j++
    ) { // O(E)
    this.addEdge(row.volunteerName, convertedRows[j].volunteerName);
    }
}

// Total is 0(N * E)

```

Complexity of print the connections table:
```typescript
 let data = "";

this.connections.forEach((neighbors, node1) => { // 0(V)
    neighbors.forEach((weight, node2) => { // 0(E)
    data = data.concat(node1, ",", node2, ",", weight.toString(), "\r\n");
    });
});

return data.trim();

// Total is 0(V * E)

```