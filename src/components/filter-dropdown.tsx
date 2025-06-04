"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



export default function FilterDropdown() {

  // state can be "", "pending" or "completed"
  const [filterStatus, setFilterStatus] = useState<string>("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleChangeFilter(e: string) {
    const params = new URLSearchParams(searchParams);

    if (e) {
      params.set("status", e);
    } else {
      params.delete("status");
    }
    replace(`${pathName}?${params.toString()}`);
    setFilterStatus(e);
  }


 return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"default"}
          className="flex gap-2 text-slate-600"
        >
          <Filter className="h-4 w-4" />
          Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterStatus}
          onValueChange={handleChangeFilter}
        >
          <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">
            Pendente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
