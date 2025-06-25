"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const categories = ["Semua", "Komplit", "Ban Dalam", "Ban Luar", "Jari-jari", "Vleg", "Bosh"];

export default function Category({ selectedCategory, setSelectedCategory }: { selectedCategory: string; setSelectedCategory: (value: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px]">
          {selectedCategory}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {categories.map((category) => (
          <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
