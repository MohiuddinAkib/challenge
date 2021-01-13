export abstract class AbsTractBaseGraph<NodeType, NeighborListType> {
  protected _adjacencyList = new Map<NodeType, NeighborListType>();

  get connections() {
    return new Map(this._adjacencyList);
  }

  public abstract addVertex(vertex: NodeType): void;

  public abstract addEdge(v1: NodeType, v2: NodeType): void;
}
