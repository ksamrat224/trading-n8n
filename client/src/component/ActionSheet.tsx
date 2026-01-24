import { Button } from "@/components/ui/button";
import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { TradingMetaData } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyper liquid.",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on lighter.",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on backpack.",
  },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetaData | {}>({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Select the type of action that you need.
          </SheetDescription>
          <div className="mt-2 flex flex-col gap-4">
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
                    <SelectItem
                      key={id}
                      onSelect={() => setSelectedAction(id)}
                      value={id}
                    >
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {(selectedAction === "hyperliquid" ||
              selectedAction === "lighter" ||
              selectedAction === "backpack") && (
              <div>
                <div className="pt-4">Type</div>
                <Select
                  value={metadata?.type}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger id="asset-select" className="w-full">
                    <SelectValue placeholder="Select an Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"long"}>LONG</SelectItem>
                      <SelectItem value={"short"}>SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">Symbol</div>
                <Select
                  value={metadata?.symbol}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      symbol: value,
                    }))
                  }
                >
                  <SelectTrigger id="asset-select" className="w-full">
                    <SelectValue placeholder="Select an Symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">Qty</div>
                <Input
                  value={metadata.qty || ""}
                  onChange={(e) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      qty: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}
          </div>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => onSelect(selectedAction as NodeKind, metadata)}
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
