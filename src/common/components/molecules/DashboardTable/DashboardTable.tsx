import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from 'common/components/atoms/Table';

// Define the type for the data prop
interface Props {
  data: Person[]; // Assuming Person is the type of your data
}

const columnHelper = createColumnHelper<Person>(); // Specify the type for the column helper

const DashboardTable: React.FC<Props> = ({ data }) => {
  console.log("kjhgfdsdfgh",data)
  const columns = [
    columnHelper.accessor('passengerName', {
      header: () => 'Name',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('airlineName', {
      header: () => 'Airline',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('trips', {
      header: () => 'Trips',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('airlineHeadQuaters', {
      header: () => <span>Head Quarters</span>,
      cell: (info) => info.renderValue(),
    }),
  ];

  return <Table data={data} columns={columns} />;
};

export default DashboardTable;
