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

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes.",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description:
      "Runs whenever the trigger  price goes above or below a certain number for an asset.",
  },
];

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH", "USDC", "USDT"];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<
    PriceTriggerNodeMetadata | TimerNodeMetadata
  >({ time: 3600 });
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id,
  );
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need.
          </SheetDescription>
          <div className="mt-2 flex flex-col gap-4">
            <Select value={selectedTrigger} onValueChange={setSelectedTrigger}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <SelectItem
                      key={id}
                      onSelect={() => setSelectedTrigger(id)}
                      value={id}
                    >
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedTrigger === "timer" && (
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
            {selectedTrigger === "price-trigger" && (
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
                    selectedTrigger === "price-trigger" && "price" in metadata
                      ? (metadata.price ?? "")
                      : ""
                  }
                />
                <label htmlFor="asset-select">Asset:</label>
                <Select
                  value={
                    selectedTrigger === "price-trigger" && "asset" in metadata
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
            onClick={() => onSelect(selectedTrigger as NodeKind, metadata)}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
