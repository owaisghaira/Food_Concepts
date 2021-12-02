import React from 'react'
import { Divider, Button, Space, Layout } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useLayout } from '../providers/layout-provider';
import { removeAllCartItems, removeItem, subtractQuantity, addToCart } from '../redux/actions/cartAction'

const Cart = ({ displayButtons }) => {
    const [isMobileLayout] = useLayout();
    let history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const goToCheckOut = () => {
        history.push({ pathname: '/checkout' });
    }
    const calculateTotal = (items) => {
        let total = items.map((val) => val.Quantity * val.SellingPrice).reduce((a, b) => a + b, 0)
        // setSubtotal(total)
        return total
    }


    return (
        <div className={isMobileLayout && ''}>
            <h5 className='mt-3'>Your Cart</h5>
            {cartItems.length === 0 && <p>Start adding items to your cart.</p>}
            <Divider />
            <div>
                {cartItems?.map((val) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', margin: '8px' }}>
                            <div>
                                <h5>{val.MetaTitle}</h5>
                                <div>RS.{val.SellingPrice}</div>
                                <Space>
                                    {val.Quantity === 1 ?
                                        <Button onClick={() => { dispatch(removeItem(val)) }} ><DeleteOutlined /></Button>
                                        :
                                        <Button onClick={() => { dispatch(subtractQuantity(val)) }}>-</Button>}
                                    <span> {val.Quantity} </span>
                                    <Button onClick={() => { dispatch(addToCart(val)) }}>+</Button>

                                </Space>
                                <Divider />
                            </div>
                            <div>
                                <img width='80' height='80' style={{ objectFit: 'cover' }} src={val.image} alt='pic' />
                            </div>
                        </div>
                    )
                })}

            </div>
            <Divider />
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Subtotal</div>
                    <div>{calculateTotal(cartItems)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Delivery Fee</div>
                    <div>{cartItems.length > 0 ? 50 : 0}</div>
                </div>
                <Divider style={{ margin: '5px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Total Price</div>
                    <div>{calculateTotal(cartItems) + 50}</div>
                </div>
                {displayButtons &&
                <div>
                    <Button onClick={goToCheckOut} style={{ background: '#303d4e', color: '#fff', width: '90%', margin: '15px' }}>Go To CheckOut</Button>
                    <Button onClick={() => { dispatch(removeAllCartItems()) }} style={{ background: '#303d4e', color: '#fff', width: '90%', margin: '15px' }}>Clear Cart</Button>
                </div>}
            </div>


        </div>
    )
}

export default Cart
