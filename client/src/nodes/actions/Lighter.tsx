import type { SUPPORTED_ASSETS } from "@/component/TriggerSheet";
import { Handle, Position } from "@xyflow/react";

export type TradingMetaData = {
  type: "LONG" | "SHORT";
  qty: number;
  symbol: typeof SUPPORTED_ASSETS;
};
export function Lighter({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg border-2 border-blue-400 min-w-48">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
        <span className="text-xs font-medium uppercase tracking-wide opacity-90">
          Lighter Exchange
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">{data.metadata.type} Trade</div>
        <div className="text-sm opacity-90">
          {data.metadata.qty} {data.metadata.symbol}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-white !border-2 !border-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-white !border-2 !border-blue-500"
      />
    </div>
  );
}
