import { Button } from "@/components/ui/button";
import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need.
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <>
                      <SelectItem
                        onSelect={() => onSelect(id, metadata)}
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
          <Button type="submit">Create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
