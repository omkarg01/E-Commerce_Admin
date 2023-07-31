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
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const { SearchBar } = Search;

let nameFilter;
let emailFilter;

const PartnershipListScreen = () => {
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
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     nameFilter = filter;
        //   },
        // }),
      },
      
      
      {
        dataField: 'vendorEmail',
        text: 'Vendor Email',
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     emailFilter = filter;
        //   },
        // }),
      },
      {
        dataField: 'vendorPhone',
        text: 'Vendor Phone',
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     emailFilter = filter;
        //   },
        // }),
      },
      {
        dataField: 'ownerName',
        text: 'Owner Name',
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     emailFilter = filter;
        //   },
        // }),
      },
      {
        dataField: 'ownerEmail',
        text: 'Owner Email',
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     emailFilter = filter;
        //   },
        // }),
      },
      {
        dataField: 'ownerPhone',
        text: 'Owner Phone',
        // filter: textFilter({
        //   getFilter: (filter) => {
        //     emailFilter = filter;
        //   },
        // }),
      },
      
      {
        dataField: 'category',
        text: 'Category',
        formatter: (cell) => categories[cell],
        filter: selectFilter({
          options: categories,
        }),
      },
      {
        dataField: 'status',
        text: 'Status',
      },
      {
        dataField: 'actions',
        text: 'Actions',
      },
    ];
    setColumns(columns);
  }

  function tableActions(user) {
    return (
      <LinkContainer to={`/admin/partnership/${user.id}`}>
        <Button variant='light' className='btn-sm'>
          Details
        </Button>
      </LinkContainer>
    );
  }

  function setTableData() {
    console.log('users', data);
    let usersList = data.partnership.map((each, index) => ({
      id: each.id,
      vendorName: each.vendorName,
      vendorAddress: each.vendorAddress,
      pincode: each.pincode,
      vendorEmail: each.vendorEmail,
      vendorPhone: each.vendorPhone,
      ownerName: each.ownerName,
      ownerEmail: each.ownerEmail,
      ownerPhone: each.ownerPhone,
      cert: each.shopRegistrationCert,
      pancard: each.shopPancard,
      category: index % 3 === 0 ? 2 : index % 3 === 1 ? 1 : 3,
      status: each.status === "approved" ? (
        <FaCheck style={{ color: 'green' }} />
      ) : each.status === "pending" ? (
        <MdPendingActions style={{ color: '#f5d142' }} />
      ) : <FaTimes style={{ color: 'red' }} />,
      actions: tableActions(each),
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
      <h1>Partnership</h1>
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

export default PartnershipListScreen;
