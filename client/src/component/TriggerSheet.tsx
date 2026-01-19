import { Button } from "@/components/ui/button";
import type { NodeKind } from "./CreateWorkflow";
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

type NodeMetaData = any;
export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need.
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
