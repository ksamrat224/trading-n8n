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

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState({});
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
            <Select value={selectedTrigger} onValueChange={setSelectedTrigger}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <>
                      <SelectItem
                        key={id}
                        onSelect={() => setSelectedTrigger(id)}
                        value={id}
                      >
                        {title}
                      </SelectItem>
                      {/* <SelectLabel className="text-sm text-muted-foreground">{description}</SelectLabel> */}
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SheetDescription>
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
