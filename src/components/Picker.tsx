import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";

interface PickerProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Picker({
  label,
  value,
  options,
  onSelect,
  placeholder = "Vælg",
}: PickerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full h-14 text-lg justify-between">
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[65vh] p-0">
        <div className="p-4">
          <SheetHeader>
            <SheetTitle className="text-lg">{label}</SheetTitle>
          </SheetHeader>
        </div>
        <div className="px-4 pb-20 space-y-2 overflow-y-auto">
          {options.map((opt) => (
            <SheetClose asChild key={opt}>
              <Button
                variant="ghost"
                className="w-full h-14 text-lg border rounded-xl justify-start"
                onClick={() => onSelect(opt)}
              >
                {opt}
              </Button>
            </SheetClose>
          ))}
        </div>
        <SheetFooter className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t" />
      </SheetContent>
    </Sheet>
  );
}

