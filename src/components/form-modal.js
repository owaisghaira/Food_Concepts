import React, { useState } from 'react';
import { Modal, Form, Typography, Button, Input } from 'antd';
import OpenSearchService from '../services/opensearch-service';

const { Title, Text } = Typography;

const FormModal = ({ displayModal, toggleModal, collection, setCollectionId }) => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);

    let initialValues = {
        name: '',
        company_name: '',
        email: '',
        phone_number: '',
        message: '',
    };

    const validate = (event) => {

        console.log(event);
        console.log(event.target.value);
        var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

        var reg = /^[0-9\.\+\-\(\)]*$/
        let result = reg.test(event.target.value);

        if (!result) {
            event.preventDefault();
        }
    }

    const onKeyPress = (e) => {
        const specialCharRegex = new RegExp("[0-9-+() ]");
        const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!specialCharRegex.test(pressedKey)) {
            e.preventDefault();
            return false;
        }
    }

    const replaceValues = (e) => {

    }

    const onFinish = async (values) => {

        let data = { ...values, collection_name: '', collection_items: [] }

        data.collection_name = collection.name;

        collection.items.map(item => {
            let row = {
                id: item.id,
                item_website_design_code: item.item_website_design_code,
                item_title: item.item_title,
                item_image: item.item_image
            }

            data.collection_items.push(row);

            return item;
        });

        setIsDisabled(true);

        let response = await OpenSearchService.submitForm(data);

        if (response) {
            setCollectionId(response.data);
            form.resetFields();
            toggleModal(false);
            setIsDisabled(false);
        }

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const submitForm = (e) => {
        if (e.detail === 1) {
            form.submit();
        }
    }

    return (
        <>
            <Modal
                footer={null}
                title={null}
                visible={displayModal}
                //onOk={() => toggleModal(false)}
                onCancel={() => toggleModal(false)}
            >
                <Title level={5}>Fill this form to submit the enquiry</Title>
                <Text>We will get back you shortly!!!</Text>
                <Form
                    initialValues={initialValues}
                    form={form}
                    layout='vertical'
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                // onKeyPress={(e) => {
                //     console.log(e);
                //     if (e.which === 13) {
                //         e.preventDefault();
                //         return false;
                //     }
                // }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <Form.Item required name="name" rules={[
                            {
                                required: true,
                                message: 'Name field is required',
                            },
                        ]} >
                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                <input placeholder=" " />
                                <span>Your name</span>
                            </label>
                        </Form.Item>

                        <Form.Item required name="company_name" rules={[
                            {
                                required: true,
                                message: 'Company name field is required',
                            },
                        ]} >
                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                <input placeholder=" " />
                                <span>Company name</span>
                            </label>
                        </Form.Item>

                        <Form.Item required name="email" rules={[
                            {
                                required: true,
                                message: 'Email field is required',
                            },
                        ]} >
                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                <input placeholder=" " />
                                <span>Email id</span>
                            </label>
                        </Form.Item>

                        <Form.Item required name="phone_number" rules={[
                            {
                                required: true,
                                message: 'Phone number field is required',
                            },
                        ]} >
                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                <input placeholder=" " onKeyPress={onKeyPress} />
                                <span>Phone number</span>
                            </label>
                        </Form.Item>

                        <Form.Item required name="message" rules={[
                            {
                                required: true,
                                message: 'Message field is required',
                            },
                        ]} >
                            <label className="pure-material-textfield-outlined" style={{ width: '100%' }}>
                                <Input.TextArea placeholder=" " autoSize={{ minRows: 2, maxRows: 6 }} />
                                <span>Message</span>
                            </label>
                        </Form.Item>
                        <Button onClick={(e) => submitForm(e)} htmlType="button" type="primary" disabled={isDisabled} style={{ background: '#303d4e', borderRadius: '8px', color: '#fff', height: '50px' }}>
                            <span> {isDisabled ? 'Please wait' : 'Send Enquiry'} </span>
                        </Button>

                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default FormModal