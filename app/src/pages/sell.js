import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { BiScan } from 'react-icons/bi'
import Axios from '../store/axiosInstance'
import '../static/css/login.css'
import { Link } from 'react-router-dom'

import { popups,buyerAddress as ba,productId as pi } from '../store/atoms'

export default function BuyProduct() {
    const setPopup = useSetRecoilState(popups)
    const buyerAddress = useRecoilValue(ba)
    const productId = useRecoilValue(pi)

    const schema = yup.object({
        productId: yup.string().required('Required!').max(30),
        address: yup.string().required('Required!').max(16, 'Enter 16 character long public address of buyer').min(16, 'Enter 16 character long public address of buyer')
    });

    const initialValues = {
        productId: productId,
        address:buyerAddress
    }

    async function sellProduct(values) {
        try {
            const response = await Axios.post('/seller/sellproduct', values)
            if (response.status === 200) {
                setPopup(`Product Sold successfully to ${values.address}`)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }


    return (<section>

        <div className="containerS">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn">Sell To Other Sellers</a></li>
                    </ul>
                </div>
                <div className="formParent">

                    <Formik
                        validationSchema={schema}
                        onSubmit={sellProduct}
                        initialValues={initialValues}
                    >
                        <Fm className="form-signin" name="form">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Address </Form.Label>
                                    <div className="d-flex">

                                        <Field
                                            tabIndex="1"
                                            type="text"
                                            placeholder="address"
                                            name="address"
                                            className="form-styling" />

                                        <Link to={{pathname: '/scan', query: {returnAddress:'/sell',value:'buyerAddress'}}}>
                                            <BiScan size={35} color="white" />
                                        </Link>

                                    </div>
                                    <ErrorMessage name="address" />

                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="2">
                                    <Form.Label>Product ID</Form.Label>
                                    <div className="d-flex">

                                        <Field
                                            tabIndex="2"
                                            type="text"
                                            placeholder="Product Id"
                                            name="productId"
                                            className="form-styling" />
                                        <Link to={{pathname: '/scan', query: {returnAddress:'/sell',value:'productId'}}}>
                                            <BiScan size={35} color="white" />
                                        </Link>

                                    </div>
                                    <ErrorMessage name="productId" />

                                </Form.Group>

                            </Form.Row>

                            <Button className="btn btn-signup" tabIndex="4" type="submit">Sell</Button>

                        </Fm>
                    </Formik>
                </div>
            </div>
        </div>
    </section>)
}