import React from 'react';
import { useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetPartnershipDetailQuery } from '../../slices/usersApiSlice';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const PartnershipScreen = () => {
  const { id } = useParams();
  const { data, isLoading, refetch, error } = useGetPartnershipDetailQuery(id);
  console.log(data);


  const rejectHandler = async (e) => {
    e.preventDefault();
    toast.error('Application Rejected!', {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark"
    });
  }

  const approveHandler = async (e) => {
    e.preventDefault();
    toast.success('Application Approved!', {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark"
    });
  }

  return (
    <>
      <h1>Partnership</h1>
      <Container>
        {/* <h1>Edit Product</h1> */}
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Form>
              <Row lg={4}>
                <Col>
                  <Form.Group controlId='vendorName'>
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Vendor Name'
                      value={data.vendorName}
                      readOnly
                      //   onChange={(e) => setVendorName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='addressVendor'>
                    <Form.Label>Address of Vendor</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter vendor address'
                      value={data.vendorAddress}
                      readOnly
                      //   onChange={(e) => setAddressVendor(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='pincode'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter pincode'
                      value={data.pincode}
                      readOnly
                      //   onChange={(e) => setPincode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='vendorEmail'>
                    <Form.Label>Vendor Email</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter email'
                      value={data.vendorEmail}
                      readOnly
                      //   onChange={(e) => setVendorEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='vendorPhone'>
                    <Form.Label>Vendor Phone</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter vendor phone number'
                      value={data.vendorPhone}
                      readOnly
                      //   onChange={(e) => setVendorPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='ownerName'>
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter owner name'
                      value={data.ownerName}
                      readOnly
                      //   onChange={(e) => setOwnerName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='ownerEmail'>
                    <Form.Label>Owner Email</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter email'
                      value={data.ownerEmail}
                      readOnly
                      //   onChange={(e) => setOwnerEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='ownerPhone'>
                    <Form.Label>Owner Phone</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter owner phone number'
                      value={data.ownerPhone}
                      readOnly
                      //   onChange={(e) => setOwnerPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='pandcard'>
                    <Form.Label>Shop Pancard</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter pancard number'
                      value={data.shopPancard}
                      readOnly
                      //   onChange={(e) => setPandcard(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row >
                <Col lg={2}>
                  <Button
                    className='border-solid ml-5 my-3'
                    type='submit'
                    variant='success'
                    onClick={approveHandler}
                  >
                    Accept for Partnership
                  </Button>
                </Col>
                <Col lg={2}>
                  <Button
                    className='border-solid ml-5 my-3'
                    type='submit'
                    variant='danger'
                    onClick={rejectHandler}
                  >
                    Reject for Partnership
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default PartnershipScreen;
