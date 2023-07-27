import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';
import { useState } from 'react';

const Header = () => {
  const [key, setKey] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (eventKey) => {
    setKey(eventKey);
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer> */}

              {/* Category Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title='Category'
                  id='adminmenu'
                  onSelect={handleSelect}
                >
                  {/* <LinkContainer to='/admin/userlist'> */}
                  <NavDropdown.Item eventKey='1'>Grocery</NavDropdown.Item>
                  {/* </LinkContainer> */}
                  {/* <LinkContainer to='/admin/productlist'> */}
                  <NavDropdown.Item eventKey='2'>Clothing</NavDropdown.Item>
                  {/* </LinkContainer> */}
                  {/* <LinkContainer to='/admin/orderlist'> */}
                  <NavDropdown.Item eventKey='3'>Electronics</NavDropdown.Item>
                  {/* </LinkContainer> */}
                  {/* <LinkContainer to='/admin/kitchen'> */}
                  <NavDropdown.Item eventKey='4'>
                    Home & Kitchen
                  </NavDropdown.Item>
                  {/* </LinkContainer> */}
                </NavDropdown>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to={`/admin/userlist/${key}`}>
                    <NavDropdown.Item>Vendors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/productlist/${key}`}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/orderlist/${key}`}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/revenue/${key}`}>
                    <NavDropdown.Item>Revenue</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
