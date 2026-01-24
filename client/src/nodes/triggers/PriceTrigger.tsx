import { Handle, Position } from "@xyflow/react";

//asset => SOL
//price => 150000000
//decimals => 6
export type PriceTriggerMetadata = {
  asset: string;
  price: number;
  decimals: number;
};

export function PriceTrigger({
  data,
  isConnectable,
}: {
  data: { metadata: PriceTriggerMetadata };
  isConnectable: boolean;
}) {
  return (
    <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-lg shadow-lg border-2 border-emerald-400 min-w-48">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium uppercase tracking-wide opacity-90">
          Price Trigger
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">{data.metadata.asset}</div>
        <div className="text-sm opacity-90">
          ${data.metadata.price.toLocaleString()}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-white !border-2 !border-emerald-500"
      />
    </div>
  );
}
