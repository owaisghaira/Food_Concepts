import React, { useState } from 'react'
import { useLayout } from '../providers/layout-provider';
import ApplicationLayout from '../layout';
import { useHistory } from 'react-router';
import { Layout, Typography, Input ,Button} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons'
const { Content } = Layout;
const { Title } = Typography;

const PlaceOrder = () => {
    const [isMobileLayout] = useLayout();
    const history  = useHistory()
    const goToTrack=()=>{
        history.push({pathname:'/track-order'})
    }

    return (
        <ApplicationLayout>
            <Content>
                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }}>

                    <div className='row my-5'>
                        <div className='col-lg-2 '></div>
                        <div className='col-lg-8 col-12 '>
                            <div className='shadow text-center p-3'>
                                <CheckCircleOutlined className='svg-done' />
                                <Title level={3}>Your Order Placed</Title>
                                <Title level={3}>Your Order No. <br /> 000212</Title>
                                <Button onClick={goToTrack} style={{ background: '#303d4e', color: '#fff', width: '50%', }}>Track Order</Button>
                                {/* <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                    <Input.TextArea onChange={(e) => console.log(e.target.value)} placeholder=" " autoSize={{ minRows: 2, maxRows: 6 }} />
                                    <span>Address</span>
                                </label>

                            </div>
                            <div className='shadow my-5 p-3'>
                                <Title level={3}>Personal Detail</Title>
                                
                            </div>
                            <div className='shadow my-3 p-3'>
                                <Title level={3}>Payment Detail</Title>
                                <Text>Cash On Delivery</Text>
                            </div>
                            {!isMobileLayout && <Button onClick={goToOrder} style={{ background: '#303d4e', color: '#fff', width: '100%', }}>Place Order</Button>} */}

                            </div>
                            <div className='col-lg-2 '></div>
                        </div>
                    </div>
                </div>
            </Content>
        </ApplicationLayout>
    )
}

export default PlaceOrder
