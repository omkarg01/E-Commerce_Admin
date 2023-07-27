import React from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
  selectFilter,
  textFilter,
} from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import { Button } from 'react-bootstrap';
import ClearButton from '../../components/ClearButton';

const { SearchBar } = Search;

let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;

const RevenueScreen = () => {
  const { id: catergoryId } = useParams();

    const selectOptions = {
      0: 'good',
      1: 'Bad',
      2: 'unknown',
    };

//   const selectOptions = [
//     { value: 0, label: 'good' },
//     { value: 1, label: 'bad' },
//     { value: 2, label: 'unknown' },
//   ];

  const columns = [
    {
      dataField: 'name',
      text: 'Product Name',
      formatter: cell => selectOptions[cell],
    //   formatter: (cell) =>
    //     selectOptions.find((opt) => opt.value === cell).label,
      filter: selectFilter({
        options:() => selectOptions,
      }),

      //   filter: textFilter({
      //     getFilter: (filter) => {
      //       nameFilter = filter;
      //     },
      //   }),
    },
    {
      dataField: 'price',
      text: 'Price',
      filter: textFilter({
        getFilter: (filter) => {
          priceFilter = filter;
        },
      }),
      sort: true,
    },
    {
      dataField: 'stock',
      text: 'Stock',
      filter: textFilter({
        getFilter: (filter) => {
          stockFilter = filter;
        },
      }),
    },
    {
      dataField: 'origin',
      text: 'Origin',
      filter: textFilter({
        getFilter: (filter) => {
          originFilter = filter;
        },
      }),
    },
  ];

  const clearAllFilter = () => {
    nameFilter('');
    priceFilter('');
    originFilter('');
    stockFilter('');
  };

  const products = [
    {
      name: 0,
      price: 100,
      stock: 10,
      origin: 'japan',
    },
    {
      name: 1,
      price: 150,
      stock: 35,
      origin: 'spain',
    },
    {
      name: 2,
      price: 300,
      stock: 4,
      origin: 'america',
    },
  ];

  return (
    <>
      <h1>{categories[catergoryId]} : RevenueScreen</h1>
      <h1>Clear search bar and filter</h1>
      <ToolkitProvider
        bootstrap4
        keyField='name'
        data={products}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <SearchBar
              {...props.searchProps}
              style={{ width: '400px', height: '40px' }}
            />
            <ClearButton
              {...props.searchProps}
              clearAllFilter={clearAllFilter}
            />
            <BootstrapTable
              {...props.baseProps}
              filter={filterFactory()}
              noDataIndication='There is no solution'
              striped
              hover
              condensed
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  );
};

export default RevenueScreen;
