import React, { useEffect, useState } from 'react'
import ApplicationLayout from '../layout';
import { Divider, Layout, Typography, } from 'antd';
import { useLayout } from '../providers/layout-provider';
const { Title, Text } = Typography
const { Content } = Layout;

const TrackOrder = () => {
    const [isMobileLayout] = useLayout();

    useEffect(() => {

    }, [])

    return (
        <ApplicationLayout>
            <Content>

                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }}>

                    <div className='row my-5'>
                        <div className='col-lg-2 '></div>
                        <div className='col-lg-8 col-12 '>
                            <div className='shadow p-3'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h2 >Order Details</h2>
                                    <h2>Order #000212</h2>
                                </div>
                                <Divider />
                                <h4 style={{ fontWeight: 'bold' }}>Shipping Address</h4>
                                <div>
                                    <h5 >Address </h5>
                                    <p> Kashif Foods - Gulistan e Johar
                                        Shop # 5, Gold line residency, Block16 - A, Near KDA Overseas society, Gulistan e Johar, Karachi
                                        Karachi, 75950
                                    </p>
                                </div>
                                <Divider />
                                <h4 style={{ fontWeight: 'bold' }} >Personal Information</h4>
                                <div>
                                    <h5>Name </h5>
                                    <p> owais siddiq</p>
                                    <h5>Phone </h5>
                                    <p> 0123456</p>
                                    <h5>Notes </h5>
                                    <p> please deliver in 10 minutes</p>
                                </div>
                                <Divider />
                                <h4 style={{ fontWeight: 'bold' }}>Payment Information</h4>
                                <div className='col-lg-6'>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>Subtotal</div>
                                        <div>200</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>Delivery Fee</div>
                                        <div>50</div>
                                    </div>
                                    <Divider style={{ margin: '5px' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>Total Price</div>
                                        <div>250</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-2 '></div>
                    </div>
                </div>
            </Content>
        </ApplicationLayout>
    )
}

export default TrackOrder
