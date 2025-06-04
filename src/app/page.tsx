import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from 'axios';

type ComponentProps = {
  searchParams?: {
    search?: string;
    status?: string;
    sort?: string;
  };
};

export default async function Home({ searchParams }: ComponentProps) {
  // fetch dos dados

 const resolvedSearchParams = await searchParams;

console.log(resolvedSearchParams?.search);

  const response = await axios.get(
    "https://apis.codante.io/api/orders-api/orders",
    {
      params: {
        search: resolvedSearchParams?.search,
        status: resolvedSearchParams?.status,
        sort: resolvedSearchParams?.sort,
      },
    }
  );
  const orders = response.data.data;
//  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); 
////  console.log('ORDEM: ', orders);
//  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); 

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable  orders={orders} />
          <div className="mt-8">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
