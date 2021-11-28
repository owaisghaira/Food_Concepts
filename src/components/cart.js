import React, { useState } from 'react'
import { Divider, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { removeAllCartItems, removeItem, addQuantity, subtractQuantity, addToCart } from '../redux/actions/cartAction'


const Cart = () => {
    const [subtotoal ,setSubtotal] = useState(0)
    let history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const goToCheckOut = () => {
        history.push({ pathname: '/checkout' });
    }

    return (
        <>
            <h5 className='mt-3'>Your Cart</h5>
            <p>Start adding items to your cart.</p>
            <Divider />
            <div>
                {cartItems?.map((val) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', margin: '8px' }}>
                            <div>
                                <h5>{val.MetaTitle}</h5>
                                <div>RS.{val.SellingPrice}</div>
                                <Space>
                                    {val.Quantity == 1 ?
                                        <span onClick={() => { dispatch(removeItem(val)) }} ><DeleteOutlined /></span>
                                        :
                                        <Button onClick={() => { dispatch(subtractQuantity(val)) }}>-</Button>}
                                    <span> {val.Quantity} </span>
                                    <Button onClick={() => { dispatch(addToCart(val)) }}>+</Button>

                                </Space>
                                <Divider />
                            </div>
                            <div>
                                <img width='80' height='80' style={{ objectFit: 'cover' }} src={val.Images} alt='pic' />
                            </div>
                        </div>
                    )
                })}

            </div>
            <Divider />
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
            <Button onClick={goToCheckOut} style={{ background: '#303d4e', color: '#fff', width: '90%', margin: '15px' }}>Go To CheckOut</Button>
            <Button onClick={() => { dispatch(removeAllCartItems()) }} style={{ background: '#303d4e', color: '#fff', width: '90%', margin: '15px' }}>Clear Cart</Button>
        </>
    )
}

export default Cart
