import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
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
import { useEffect, useState } from 'react';
import ClearButton from '../../components/ClearButton';

const { SearchBar } = Search;

let nameFilter;
let emailFilter;

const UserListScreen = () => {
  const [usersList, setUsersList] = useState();
  const [columns, setColumns] = useState();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  function setTableHeading() {
    let columns = [
      {
        dataField: 'id',
        text: 'Vendor ID',
      },
      {
        dataField: 'name',
        text: 'Vendor Name',
        filter: textFilter({
          getFilter: (filter) => {
            nameFilter = filter;
          },
        }),
      },
      {
        dataField: 'email',
        text: 'Vendor Email',
        filter: textFilter({
          getFilter: (filter) => {
            emailFilter = filter;
          },
        }),
      },
      {
        dataField: 'category',
        text: 'Category',
        formatter: (cell) => categories[cell],
        filter: selectFilter({
          options: categories,
        }),
      },
      // {
      //   dataField: 'actions',
      //   text: 'Actions',
      // },
    ];
    setColumns(columns);
  }

  function tableActions(user) {
    return (
      <>
        <LinkContainer
          to={`/admin/user/${user._id}/edit`}
          style={{ marginRight: '10px' }}
        >
          <Button variant='light' className='btn-sm mx-2'>
            <FaEdit />
          </Button>
        </LinkContainer>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(user._id)}
        >
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </>
    );
  }

  function setTableData() {
    console.log('users', users);
    let usersList = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      category: 2,
      // actions: tableActions(user),
    }));

    setUsersList(usersList);
  }

  useEffect(() => {
    if (users) {
      setTableData();
      setTableHeading();
    }
  }, [users]);

  const clearAllFilter = () => {
    nameFilter('');
    emailFilter('');
  };

  return (
    <>
      <h1> Vendors</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {usersList && (
            <>
              <ToolkitProvider
                bootstrap4
                keyField='name'
                data={usersList}
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
          {/* <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: '10px' }}
                        >
                          <Button variant='light' className='btn-sm'>
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: 'white' }} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </>
      )}
    </>
  );
};

export default UserListScreen;
