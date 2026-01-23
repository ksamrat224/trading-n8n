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
import type { PriceTriggerNodeMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
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

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetaData | null>(null);
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need.
          </SheetDescription>
          <div className="mt-2 flex flex-col gap-4">
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Trigger" />
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
            {selectedAction === "timer" && (
              <div>
                <div>Number of seconds after which to run the timer</div>
                <Input
                  value={metadata.time}
                  onChange={(e) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      time: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}
            {selectedAction === "price-trigger" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="price-input">Price:</label>
                <Input
                  id="price-input"
                  type="text"
                  onChange={(e) =>
                    setMetadata(
                      (m) =>
                        ({
                          ...m,
                          price: Number(e.target.value),
                        }) as PriceTriggerNodeMetadata,
                    )
                  }
                  value={
                    selectedAction === "price-trigger" && "price" in metadata
                      ? (metadata.price ?? "")
                      : ""
                  }
                />
                <label htmlFor="asset-select">Asset:</label>
                <Select
                  value={
                    selectedAction === "price-trigger" && "asset" in metadata
                      ? metadata.asset
                      : undefined
                  }
                  onValueChange={(value) =>
                    setMetadata(
                      (metadata) =>
                        ({
                          ...metadata,
                          asset: value,
                        }) as PriceTriggerNodeMetadata,
                    )
                  }
                >
                  <SelectTrigger id="asset-select" className="w-full">
                    <SelectValue placeholder="Select an Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <SelectItem key={id} value={id}>
                          {id}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => onSelect(selectedAction as NodeKind, metadata)}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
