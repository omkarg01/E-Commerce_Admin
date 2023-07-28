import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
  selectFilter,
  textFilter,
} from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ClearButton from '../../components/ClearButton';

const { SearchBar } = Search;

let nameFilter;
let dateFilter;
let priceFilter;
let paidFilter;
let deliveredFilter;

const OrderListScreen = () => {
  const [ordersList, setOrdersList] = useState();
  const [columns, setColumns] = useState();

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  function setTableHeading() {
    let columns = [
      {
        dataField: 'id',
        text: 'Order ID',
      },
      {
        dataField: 'name',
        text: 'User Name',
        filter: textFilter({
          getFilter: (filter) => {
            nameFilter = filter;
          },
        }),
      },
      {
        dataField: 'date',
        text: 'Purchased Date',
        filter: textFilter({
          getFilter: (filter) => {
            dateFilter = filter;
          },
        }),
      },
      {
        dataField: 'total',
        text: 'Total',
        filter: textFilter({
          getFilter: (filter) => {
            priceFilter = filter;
          },
        }),
      },
      {
        dataField: 'paid',
        text: 'Paid',
        filter: textFilter({
          getFilter: (filter) => {
            paidFilter = filter;
          },
        }),
      },
      {
        dataField: 'delivered',
        text: 'Delivered',
        filter: textFilter({
          getFilter: (filter) => {
            deliveredFilter = filter;
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
      {
        dataField: 'actions',
        text: 'Actions',
      },
    ];
    setColumns(columns);
  }

  function tableActions(order) {
    return (
      <LinkContainer to={`/order/${order._id}`}>
        <Button variant='light' className='btn-sm'>
          Details
        </Button>
      </LinkContainer>
    );
  }

  function setTableData() {
    console.log('order', orders);
    let ordersList = orders.map((order) => ({
      id: order._id,
      name: order.user.name,
      date: order.createdAt.substring(0, 10),
      total: order.totalPrice,
      paid: order.isPaid ? (
        order.paidAt.substring(0, 10)
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      delivered: order.isDelivered ? (
        order.deliveredAt.substring(0, 10)
      ) : (
        <FaTimes style={{ color: 'red' }} />
      ),
      category: 2,
      actions: tableActions(order),
    }));

    setOrdersList(ordersList);
  }

  useEffect(() => {
    if (orders) {
      setTableData();
      setTableHeading();
    }
  }, [orders]);

  const clearAllFilter = () => {
    nameFilter('');
    dateFilter('');
    priceFilter('');
    paidFilter('');
    deliveredFilter('');
  };

  return (
    <>
      <h1>Orders </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        {ordersList && (
            <>
              <ToolkitProvider
                bootstrap4
                keyField='name'
                data={ordersList}
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
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen;
