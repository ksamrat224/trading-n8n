import type { SUPPORTED_ASSETS } from "@/component/TriggerSheet";

export type TradingMetaData = {
  type: "LONG" | "SHORT";
  qty: number;
  symbol: typeof SUPPORTED_ASSETS;
};
export function Lighter({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="p-4 border">
      Lighter Trade
      <div>{data.metadata.type}</div>
      <div>{data.metadata.qty}</div>
      <div>{data.metadata.symbol}</div>
    </div>
  );
}
