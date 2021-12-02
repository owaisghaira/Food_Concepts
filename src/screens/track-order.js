import React, { useEffect} from 'react'
import ApplicationLayout from '../layout';
import { Divider, Layout,Button,Input} from 'antd';
import { useLayout } from '../providers/layout-provider';
import { useSelector } from 'react-redux';
import { Cart } from '../components';
const { Content } = Layout;

const TrackOrder = () => {
    const [isMobileLayout] = useLayout();
    const collectdata = useSelector(state => state.collections)
    console.log(collectdata)
    useEffect(() => {

    }, [])

    return (
        <ApplicationLayout>
            <Content>

                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }}>

                    <div className='row my-5'>
                        <div className='col-lg-2 '></div>
                      
                        <div className='col-lg-8 col-12 '>
                        <div className='my-3' >
                        <Input required style={{width:'50%'}} placeholder="Order No." />
                        <Button style={{ background: '#303d4e', color: '#fff', width: '50%', }}>Search</Button>
                            
                        </div>
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
                                    <Cart/>
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
