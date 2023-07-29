import React from 'react';
import { useGetPartnershipQuery } from '../../slices/usersApiSlice';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
  selectFilter,
  textFilter,
} from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useEffect, useState } from 'react';
import ClearButton from '../../components/ClearButton';
import { categories } from '../../utils/categories';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const { SearchBar } = Search;

let nameFilter;
let emailFilter;

const PartnershipScreen = () => {
  const [vendorsList, setVendorsList] = useState();
  const [columns, setColumns] = useState();
  const { data, isLoading, refetch, error } = useGetPartnershipQuery();

  function setTableHeading() {
    let columns = [
      {
        dataField: 'id',
        text: 'ID',
      },
      {
        dataField: 'vendorName',
        text: 'Vendor Name',
        filter: textFilter({
          getFilter: (filter) => {
            nameFilter = filter;
          },
        }),
      },
      {
        dataField: 'vendorAddress',
        text: 'Address Of Vendor',
        filter: textFilter({
          getFilter: (filter) => {
            nameFilter = filter;
          },
        }),
      },
      {
        dataField: 'pincode',
        text: 'Pincode',
        filter: textFilter({
          getFilter: (filter) => {
            nameFilter = filter;
          },
        }),
      },
      {
        dataField: 'vendorEmail',
        text: 'Vendor Email',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'vendorPhone',
        text: 'Vendor Phone',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'ownerName',
        text: 'Owner Name',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'ownerEmail',
        text: 'Owner Email',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'ownerPhone',
        text: 'Owner Phone',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'cert',
        text: 'Shop Registration Cert',
      },
      {
        dataField: 'pancard',
        text: 'Shop Pancard',
      },
      {
        dataField: 'category',
        text: 'Category',
        formatter: (cell) => categories[cell],
        filter: selectFilter({
          options: categories,
        }),
      },
     
    ];
    setColumns(columns);
  }

  function setTableData() {
    console.log('users', data);
    let usersList = data.partnership.map((each) => ({
      id: each.id,
      vendorName: each.vendorName,
      vendorAddress: each.vendorAddress,
      pincode: each.pincode,
      vendorEmail : each.vendorEmail,
      vendorPhone : each.vendorPhone,
      ownerName : each.ownerName,
      ownerEmail : each.ownerEmail,
      ownerPhone : each.ownerPhone,
      cert : each.shopRegistrationCert,
      pancard : each.shopPancard,
      category: 2,
      // actions: tableActions(user),
    }));

    setVendorsList(usersList);
  }

  useEffect(() => {
    if (data) {
      setTableData();
      setTableHeading();
    }
  }, [data]);

  const clearAllFilter = () => {
    nameFilter('');
    emailFilter('');
  };
  return (
    <>
      <h1>PartnershipScreen</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {vendorsList && (
            <>
              <ToolkitProvider
                bootstrap4
                keyField='name'
                data={vendorsList}
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
          )}
        </>
      )}
    </>
  );
};

export default PartnershipScreen;
