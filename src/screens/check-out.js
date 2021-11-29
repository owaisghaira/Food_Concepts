import React from 'react'
import ApplicationLayout from '../layout';
import { Layout, Typography, Form, Button, Input } from 'antd';
import { useLayout } from '../providers/layout-provider';
import { Cart } from '../components'
import { useHistory } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography
const CheckOut = () => {
    const [isMobileLayout] = useLayout();
    const [form] = Form.useForm();
    let history = useHistory();

    const goToTrack = () => {
        history.push({ pathname: '/track-order' });
    }

    return (
        <ApplicationLayout>
            <Content>
                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }}>

                    <div className='row my-5'>
                        <div className='col-lg-2 '></div>
                        <div className='col-lg-5 col-12 '>
                            <div className='shadow p-3'>
                                <Title level={3}>Delivery Detail</Title>
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
                                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                                <Input.TextArea onChange={(e)=>console.log(e.target.value)} placeholder=" " autoSize={{ minRows: 2, maxRows: 6 }} />
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
                                                <input placeholder=" " />
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
                                                <input placeholder=" " />
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
                                                <Input.TextArea placeholder=" " autoSize={{ minRows: 2, maxRows: 6 }} />
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
                            <Button onClick={goToTrack} style={{ background: '#303d4e', color: '#fff', width: '100%',}}>Place Order</Button>
                        </div>
                        <div className='col-lg-3 col-12'>
                            <div style={{ position: 'fixed' }}>
                                <Title level={4}>Cart Summary</Title>
                                <Cart />
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
