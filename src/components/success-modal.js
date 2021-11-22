import React from 'react';
import { Modal, Typography } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const SuccessModal = ({ displayModal, toggleModal, collectionId }) => {

    return (
        <>
            <Modal
                footer={null}
                title={null} visible={displayModal} onOk={() => toggleModal(false)} onCancel={() => toggleModal(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CheckCircleOutlined className='svg-done' />
                    <Title level={2}>Thank You</Title>
                    <Text>We will get back to you soon with more details.</Text>
                    <div style={{ display: 'flex', flexDirection: 'colum', margin: '10px' }}>
                        <div className='m-2'><Text type="secondary"><QuestionCircleOutlined className='icon' /></Text></div>
                        <div><Text type="secondary">You can contact us at test@gmail.com with reference id <span >#{collectionId}</span></Text></div>
                    </div>
                    <Text></Text>
                </div>
            </Modal>
        </>
    )
}

export default SuccessModal