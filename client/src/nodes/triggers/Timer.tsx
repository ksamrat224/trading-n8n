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
    <div className="p-4 border">
      Every {data.metadata.time / 3600} hours
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
}
