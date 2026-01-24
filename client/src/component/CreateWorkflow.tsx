import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import { TriggerSheet } from "./TriggerSheet";
import {
  PriceTrigger,
  type PriceTriggerMetadata,
} from "@/nodes/triggers/PriceTrigger";
import { Timer, type TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Lighter, type TradingMetaData } from "@/nodes/actions/Lighter";
import { ActionSheet } from "./ActionSheet";
import { Hyperliquid } from "@/nodes/actions/Hyperliquid";
import { Backpack } from "@/nodes/actions/Backpack";

const nodeTypes = {
  "price-trigger": PriceTrigger,
  timer: Timer,
  lighter: Lighter,
  hyperliquid: Hyperliquid,
  backpack: Backpack,
};

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "hyperliquid"
  | "backpack"
  | "lighter";
interface NodeType {
  type: NodeKind;
  data: {
    kind: "action" | "trigger";
    metadata: NodeMetaData;
  };
  id: string;
  position: { x: number; y: number };
}
export type NodeMetaData =
  | TradingMetaData
  | PriceTriggerMetadata
  | TimerNodeMetadata;

interface EdgeType {
  id: string;
  source: string;
  target: string;
}

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [selectedAction, setSelectedAction] = useState<{
    position: { x: number; y: number };
    startingNodeId: string;
  } | null>(null);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const POSITION_OFFSET = 20;
  const onConnectEnd = useCallback((params, connectionInfo) => {
    if (!connectionInfo.isValid) {
      setSelectedAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x: connectionInfo.from.x + POSITION_OFFSET,
          y: connectionInfo.from.y + POSITION_OFFSET,
        },
      });
      console.log(connectionInfo.fromNode.id);
      console.log(connectionInfo.fromNode.to);
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(type, metadata) => {
            alert("hi there");
            setNodes([
              ...nodes,
              {
                id: Math.random().toString(),
                type,
                data: {
                  kind: "trigger",
                  metadata,
                },
                position: { x: 250, y: 250 },
              },
            ]);
          }}
        />
      )}
      {selectedAction && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const nodeId = Math.random().toString();
            setNodes([
              ...nodes,
              {
                id: nodeId,
                type,
                data: {
                  kind: "action",
                  metadata,
                },
                position: selectedAction.position,
              },
            ]);
            setEdges([
              ...edges,
              {
                id: Math.random().toString(),
                source: selectedAction.startingNodeId,
                target: nodeId,
              },
            ]);
            setSelectedAction(null);
          }}
        />
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}
