import React from 'react';
import { Modal} from 'antd';
import { Cart } from '../components';

const CartModal = ({ displayModal, toggleModal}) => {

    return (    
        <>
            <Modal
                footer={null}
                title={null} visible={displayModal} onOk={() => toggleModal(false)} onCancel={() => toggleModal(false)}>
                <Cart displayButtons={true}/>
            </Modal>
        </>
    )
}

export default CartModal