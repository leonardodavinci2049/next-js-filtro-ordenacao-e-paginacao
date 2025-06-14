"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Order } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleClick(sortType: string) {
    const currentURLSortParam = params.get("sort") ?? "";
    const sortTypeDesc = "-" + sortType;

    switch (currentURLSortParam) {
      case sortType:
        params.set("sort", sortTypeDesc);
        break;
      case sortTypeDesc:
        params.delete("sort");
        break;
      default:
        params.set("sort", sortType);
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function getSortIcon(sortType: string) {
    const currentURLSortParam = params.get("sort") ?? "";
    const sortTypeDesc = "-" + sortType;

    switch (currentURLSortParam) {
      case sortType:
        return <ChevronUp className="w-4" />;
      case sortTypeDesc:
        return <ChevronDown className="w-4" />;
      default:
        return <ChevronsUpDown className="w-4" />;
    }
  }

  return (
    <Table>
      {/* READER */}
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleClick("order_date")}
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIcon("order_date")}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleClick("amount_in_cents")}
          >
            Valor
            {getSortIcon("amount_in_cents")}
          </TableHead>
        </TableRow>
      </TableHeader>

      {/* BODY */}
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === "pending" ? "Pendente" : "Completo"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.order_date.toString()}
            </TableCell>
            <TableCell className="text-right">
              {formatter.format(order.amount_in_cents / 100)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
