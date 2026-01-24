import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
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
import "@xyflow/react/dist/style.css";

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
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-800">
            Workflow Builder
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {!nodes.length
              ? "Start by adding a trigger to begin your workflow"
              : `Workflow with ${nodes.length} node${nodes.length !== 1 ? "s" : ""} and ${edges.length} connection${edges.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 w-full h-full">
        {!nodes.length && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                  Create Your First Workflow
                </h2>
                <p className="text-slate-600 mb-6 max-w-md">
                  Choose a trigger to start building your automated trading
                  workflow
                </p>
              </div>
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
            </div>
          </div>
        )}

        {selectedAction && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                Add Action
              </h3>
              <p className="text-slate-600 text-sm mb-6 text-center">
                Choose an action to connect to your workflow
              </p>
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
            </div>
          </div>
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
          className="bg-transparent"
          defaultEdgeOptions={{
            animated: true,
            style: {
              strokeWidth: 2,
              stroke: "#3b82f6",
            },
          }}
        >
          <Background color="#e2e8f0" gap={20} size={1} variant="dots" />
          <Controls
            className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg"
            showInteractive={false}
          />
          <MiniMap
            className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg"
            nodeColor={(node) => {
              if (node.data?.kind === "trigger") return "#10b981";
              if (node.data?.kind === "action") return "#3b82f6";
              return "#6b7280";
            }}
            maskColor="rgba(255, 255, 255, 0.2)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
