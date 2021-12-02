import React, { useState } from 'react'
import ApplicationLayout from '../layout';
import { Layout, Typography, Form, Button, Input } from 'antd';
import { useLayout } from '../providers/layout-provider';
import { useHistory } from 'react-router';
import { Cart } from '../components'
import { useSelector, useDispatch } from 'react-redux';
import { createCollection } from '../redux/actions';
import ajaxService from '../services/ajax-service';

const { Content } = Layout;
const { Title, Text } = Typography
const CheckOut = () => {

    const [order, setOrder] = useState({ name: '', phone: '', notes: '', latitude: '00', longitude: '00', address: '', })
    const [isMobileLayout] = useLayout();
    const state = useSelector(state=>state.cart)
    const [form] = Form.useForm();
    let history = useHistory();
    const dispatch = useDispatch()
    // console.log(order)


    const goToOrder =async () => {
        if (order.name !== ''){
            let orderPost = {
                ...order,
                AddressId : 0,
                PaymentMethod : 0,
                ShippingMethod:59,
                CartItems : state
                
            };
            console.log(orderPost)
            dispatch(createCollection(order))
            await ajaxService.post('order/place',{ PlaceOrder : orderPost });

            // history.push({ pathname: '/order-place' });
        }
        else{
            alert('plz enter details')
        }
    }

    return (
        <ApplicationLayout>
            <Content>
                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }}>

                    <div className='row my-5'>
                        <div className='col-lg-2 '></div>
                        <div className='col-lg-5 col-12 '>
                            <div className='shadow p-3'>
                                <Title level={3}>Delivery Details</Title>
                                {/* <Form
                                    // initialValues={initialValues}
                                    form={form}
                                    layout='vertical'
                                    name="dynamic_form_nest_item"
                                    // onFinish={onFinish}
                                    autoComplete="off"
                                // onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }} >

                                        <Form.Item required name="message" rules={[
                                            {
                                                required: true,
                                                message: 'Address field is required',
                                            },
                                        ]} > */}
                                <div className='embed-responsive embed-responsive text-center'>
                                    <iframe class="embed-responsive-item" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.7932935192557!2d67.12217075009508!3d24.93911074816528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338980b4615af%3A0xe968e4f0fd0119cd!2sUniversity%20of%20Karachi!5e0!3m2!1sen!2s!4v1633599870229!5m2!1sen!2s" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe></div>
                                <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                    <Input.TextArea onChange={(e) => setOrder({ ...order, address: e.target.value })} placeholder=" " autoSize={{ minRows: 2, maxRows: 6 }} />
                                    <span>Address</span>
                                </label>
                                {/* </Form.Item>
                                    </div>
                                </Form> */}
                            </div>
                            <div className='shadow my-5 p-3'>
                                <Title level={3}>Personal Detail</Title>
                                <Form
                                    // initialValues={initialValues}
                                    form={form}
                                    layout='vertical'
                                    name="dynamic_form_nest_item"
                                    // onFinish={onFinish}
                                    autoComplete="off"
                                // onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                                        <Form.Item required name="company_name" rules={[
                                            {
                                                required: true,
                                                message: 'Name field is required',
                                            },
                                        ]} >
                                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                                <input placeholder=" " onChange={(e) => setOrder({ ...order, name: e.target.value })} />
                                                <span>Name</span>
                                            </label>
                                        </Form.Item>


                                        <Form.Item required name="phone" rules={[
                                            {
                                                required: false,
                                                message: 'Phone field is required',
                                            },
                                        ]} >
                                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                                <input placeholder=" " onChange={(e) => setOrder({ ...order, phone: e.target.value })} />
                                                <span>Phone No.</span>
                                            </label>
                                        </Form.Item>
                                        <Form.Item required name="message" rules={[
                                            {
                                                required: false,
                                                message: 'notes field is required',
                                            },
                                        ]} >
                                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                                <Input.TextArea placeholder=" " onChange={(e) => setOrder({ ...order, notes: e.target.value })} autoSize={{ minRows: 2, maxRows: 6 }} />
                                                <span>Notes</span>
                                            </label>
                                        </Form.Item>


                                    </div>
                                </Form>
                            </div>
                            <div className='shadow my-3 p-3'>
                                <Title level={3}>Payment Detail</Title>
                                <Text>Cash On Delivery</Text>
                            </div>
                            {!isMobileLayout && <Button onClick={goToOrder} style={{ background: '#303d4e', color: '#fff', width: '100%', }}>Place Order</Button>}

                        </div>
                        <div className='col-lg-3 col-12'>
                            <div className={!isMobileLayout && 'cart-fixed'}>
                                <Title level={4} className={isMobileLayout && 'text-center'}>Cart Summary</Title>
                                <Cart displayButtons={false} />
                                {isMobileLayout && <Button onClick={goToOrder} style={{ background: '#303d4e', color: '#fff', width: '100%', }}>Place Order</Button>}
                            </div>
                        </div>
                        <div className='col-lg-2 '></div>
                    </div>
                </div>
            </Content>
        </ApplicationLayout>
    )
}

export default CheckOut
