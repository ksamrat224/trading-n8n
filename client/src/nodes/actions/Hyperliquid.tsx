import { Handle, Position } from "@xyflow/react";
import type { TradingMetaData } from "./Lighter";

export function Hyperliquid({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="p-4 border">
      Hyperliquid Trade
      <div>{data.metadata.type}</div>
      <div>{data.metadata.qty}</div>
      <div>{data.metadata.symbol}</div>
      <Handle type="target" position={Position.Left}></Handle>
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
}
