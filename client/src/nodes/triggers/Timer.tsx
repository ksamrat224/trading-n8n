import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata = {
  time: number;
};

export function Timer({
  data,
}: {
  data: { metadata: TimerNodeMetadata };
  isConnectable: boolean;
}) {
  return (
    <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 text-white p-4 rounded-lg shadow-lg border-2 border-amber-400 min-w-48">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-amber-200 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium uppercase tracking-wide opacity-90">
          Timer Trigger
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">Every {data.metadata.time}</div>
        <div className="text-sm opacity-90">Automated interval</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-white !border-2 !border-amber-500"
      />
    </div>
  );
}
