import FilterDropdown from "@/components/filter-dropdown";
import { ModeToggle } from "@/components/mode-toggle";
import OrdersTable from "@/components/orders-table";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search-input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

type ComponentProps = {
  searchParams?: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: ComponentProps) {
  // fetch dos dados

  const resolvedSearchParams = await searchParams;

  //console.log(resolvedSearchParams?.search);

  const response = await axios.get(
    "https://apis.codante.io/api/orders-api/orders",
    {
      params: {
        search: resolvedSearchParams?.search,
        status: resolvedSearchParams?.status,
        sort: resolvedSearchParams?.sort,
        page: resolvedSearchParams?.page,
      },
    }
  );
  
  const orders = response.data?.data;
  const meta = response.data?.meta || [];

 return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <div className="flex justify-between">
            <CardTitle>Pedidos</CardTitle>
            <ModeToggle />
          </div>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex gap-4 pt-10">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
          <div className="mt-8">
        
          <Pagination links={meta.links} maxPage={meta.last_page || 1} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
