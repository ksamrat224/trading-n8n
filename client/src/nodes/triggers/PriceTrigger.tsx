import { Handle, Position } from "@xyflow/react";

//asset => SOL
//price => 150000000
//decimals => 6
export type PriceTriggerNodeMetadata = {
  asset: string;
  price: number;
  decimals: number;
};

export function PriceTrigger({
  data,
  isConnectable,
}: {
  data: { metadata: PriceTriggerNodeMetadata };
  isConnectable: boolean;
}) {
  return (
    <div className="p-4 border">
      <div>{data.metadata.asset}</div>
      <div>{data.metadata.price}</div>
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
}
