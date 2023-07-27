import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
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
let priceFilter;
let brandFilter;

const ProductListScreen = () => {
  const { id: catergoryId } = useParams();
  const [productsList, setProductsList] = useState();
  const [columns, setColumns] = useState();

  const pageNumber = 1;
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    // console.log("hello world!");
    if (data) {
      let productsList = data.products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        category: 2,
        actions: (
          <>
            <LinkContainer to={`/admin/product/${product._id}/edit`}>
              <Button variant='light' className='btn-sm mx-2'>
                <FaEdit />
              </Button>
            </LinkContainer>
            <Button
              variant='danger'
              className='btn-sm'
              onClick={() => deleteHandler(product._id)}
            >
              <FaTrash style={{ color: 'white' }} />
            </Button>
          </>
        ),
      }));

      setProductsList(productsList);
      let columns = [
        {
          dataField: 'id',
          text: 'Product ID',

          // filter: selectFilter({
          //   options: categories,
          // }),
          // filter: textFilter({
          //   getFilter: (filter) => {
          //     nameFilter = filter;
          //   },
          // }),
        },
        {
          dataField: 'name',
          text: 'Product Name',
          // filter: selectFilter({
          //   options: categories,
          // }),
          filter: textFilter({
            getFilter: (filter) => {
              nameFilter = filter;
            },
          }),
        },
        {
          dataField: 'price',
          text: 'Price (in Rs)',
          filter: textFilter({
            getFilter: (filter) => {
              priceFilter = filter;
            },
          }),
          sort: true,
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
      // console.log('products', productsList);
    }
  }, [data]);

  const clearAllFilter = () => {
    nameFilter('');
    priceFilter('');
    // originFilter('');
    // stockFilter('');
    brandFilter('');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>{categories[catergoryId]} : Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          {console.log('products', productsList)}
          {productsList && (
            <ToolkitProvider
              bootstrap4
              keyField='name'
              data={productsList}
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
          )}
          {/* <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
