import React, { useEffect, useState, createRef, useRef } from 'react'
// import ajaxService from '../services/ajax-service';
import { Card } from '../components';
import ReactResizeDetector from 'react-resize-detector';
import StackGrid, { transitions } from "react-stack-grid";
import { Divider, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';

const { scaleDown } = transitions;
let items = [];

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const StackGridItem = ({ isMobileLayout }) => {

    const [pins, setPins] = useState([]);
    const [columnWidth, setColumnWidth] = useState();
    const [gutterWidth, setGutterWidth] = useState();
    const gridContianer = createRef();
    const stackGridContianer = useRef();
    const [start, setStart] = useState(1);

    const collections = useSelector((state) => state.collections);
    console.log(collections.length)
    const handleScroll = (e) => {
        const bottom = window.pageYOffset + window.innerHeight > document.body.clientHeight - 100;

        if (bottom) {
            setStart((start) => start + 1);
        }
    }

    useEffect(() => {

        const getHomeData = async () => {
            let response = { "Success": true, "Payload": { "Category": { "CategoryID": 0, "Name": null, "Description": null, "Symbol": null, "Icon": null, "ProductCount": 0, "Keywords": null, "MetaTitle": null, "MetaDescription": null, "ImageUrl": null, "Images": null }, "Attributes": [], "Brands": [], "Categories": [], "Products": [{ "ProductID": 263, "VariantID": 0, "Name": "zinger burger", "Description": null, "SKU": "zinger burger", "Category": "Fast Food", "CategoryID": 35, "Brand": "", "Stock": 100.0, "MinimumSellingPrice": 0.0, "MaximumSellingPrice": 0.0, "SellingPrice": 300.0, "ComparePrice": 0.0, "HasVariant": false, "Variants": 0, "Formula": null, "Images": ["https://www.gardengourmet.com/sites/default/files/recipes/aeead5804e79ff6fb98b2039619c5230_200828_MEDIAMONKS_GG_Spicytarian.jpg"], "InCart": false, "InWish": false, "MetaTitle": "zinger burger", "MetaKeywords": null, "MetaDescription": null }, { "ProductID": 262, "VariantID": 0, "Name": "Pulao", "Description": null, "SKU": "Pulao", "Category": "Asian", "CategoryID": 37, "Brand": "", "Stock": 100.0, "MinimumSellingPrice": 0.0, "MaximumSellingPrice": 0.0, "SellingPrice": 220.0, "ComparePrice": 0.0, "HasVariant": false, "Variants": 0, "Formula": null, "Images": ["https://www.indianveggiedelight.com/wp-content/uploads/2017/09/coconut-milk-pulao-featured.jpg"], "InCart": false, "InWish": false, "MetaTitle": "Pulao", "MetaKeywords": null, "MetaDescription": null }, { "ProductID": 260, "VariantID": 0, "Name": "Pepsi", "Description": null, "SKU": "PEPSI", "Category": "Drinks", "CategoryID": 33, "Brand": "", "Stock": 100.0, "MinimumSellingPrice": 0.0, "MaximumSellingPrice": 0.0, "SellingPrice": 30.0, "ComparePrice": 0.0, "HasVariant": false, "Variants": 0, "Formula": null, "Images": ["https://www.pepsi.com/en-us/uploads/images/social-share.jpg?mtime=20180110134930"], "InCart": false, "InWish": false, "MetaTitle": "Pepsi", "MetaKeywords": null, "MetaDescription": null }, { "ProductID": 261, "VariantID": 0, "Name": "biryani", "Description": null, "SKU": "Biryani", "Category": "Asian", "CategoryID": 37, "Brand": "", "Stock": 100.0, "MinimumSellingPrice": 0.0, "MaximumSellingPrice": 0.0, "SellingPrice": 200.0, "ComparePrice": 0.0, "HasVariant": false, "Variants": 0, "Formula": null, "Images": ["https://c.ndtvimg.com/2019-06/klu23v08_biryani_625x300_06_June_19.jpg"], "InCart": false, "InWish": false, "MetaTitle": "biryani", "MetaKeywords": null, "MetaDescription": null }, { "ProductID": 66, "VariantID": 0, "Name": "zinger burger", "Description": null, "SKU": "zinger burger", "Category": "Fast Food", "CategoryID": 35, "Brand": "", "Stock": 100.0, "MinimumSellingPrice": 0.0, "MaximumSellingPrice": 0.0, "SellingPrice": 300.0, "ComparePrice": 0.0, "HasVariant": false, "Variants": 0, "Formula": null, "Images": ["https://www.gardengourmet.com/sites/default/files/recipes/aeead5804e79ff6fb98b2039619c5230_200828_MEDIAMONKS_GG_Spicytarian.jpg"], "InCart": false, "InWish": false, "MetaTitle": "zinger burger", "MetaKeywords": null, "MetaDescription": null },], "Banners": [], "SearchFilters": { "CategoryId": 0, "Keyword": "all", "SortAscending": false, "SortBy": null, "MinimumPrice": 0.0, "MaximumPrice": 0.0, "SearchType": 0, "StoreId": 10, "Length": 1000, "Start": 0, "Brands": null, "Attributes": null, "Page": 1 }, "IsKeywordSearch": true, "IsCategorySearch": false, "MinimumPrice": 30.0, "MaximumPrice": 300.0, "SearchType": 0, "SearchTerm": "all", "Images": [], "Total": 4, "Pager": { "TotalItems": 4, "CurrentPage": 1, "PageSize": 1000, "TotalPages": 1, "StartPage": 1, "EndPage": 1, "StartIndex": 0, "EndIndex": 3, "Pages": [1] } }, "Errors": null, "Exception": null, "Message": null }
            // let response = await ajaxService.post('Product/Search',{ Keyword : 'all' , Start : 0 , Length : 1000 });

            // console.log('>>', response.Payload.Products)
            if (response) {
                items = response.Payload.Products;
                let stacks = paginate(items, 8, start);
                setPins(stacks);
                setStart((start) => start + 1);
            }
        }

        getHomeData();

        let width = gridContianer.current.clientWidth;
        let size = isMobileLayout ? width / 2 - 25 : width / 3 - 50;
        let gutterWidth = isMobileLayout ? 10 : 30;

        setColumnWidth(size);
        setGutterWidth(gutterWidth);

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    useEffect(() => {
        setPins([...pins, ...paginate(items, 8, start)]);
    }, [start])


    return (
        <div className={isMobileLayout ? "p15" : "p35"} style={{ marginTop: '20px', marginBottom: '80px' }} >
            <div className='row'>
                <div className='col-lg-9' ref={gridContianer} >
                    <StackGrid
                        ref={stackGridContianer}
                        columnWidth={columnWidth}
                        appearDelay={2000}
                        gutterWidth={gutterWidth}
                        gutterHeight={gutterWidth + 20}
                        monitorImagesLoaded={true}

                        appear={scaleDown.appear}
                        appeared={scaleDown.appeared}
                        enter={scaleDown.enter}
                        entered={scaleDown.entered}
                        leaved={scaleDown.leaved}

                    //onScroll={handleScroll}
                    >
                        {
                            pins.map((pin, index) => {
                                return (
                                    <ReactResizeDetector
                                        key={'pin-' + index}
                                        handleWidth
                                        handleHeight
                                        onResize={() => {
                                            if (stackGridContianer) {
                                                stackGridContianer.current.updateLayout();
                                            }
                                        }}>
                                        <Card item={pin} hover={!isMobileLayout} />
                                    </ReactResizeDetector>
                                )
                            })
                        }
                    </StackGrid>
                </div>
                <div className='col-lg-3 shadow text-center'>
                    <h5 className='mt-3'>Your Cart</h5>
                    <p>Start adding items to your cart.</p>
                    <Divider />
                    <div>
                        {collections.map((val) => {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', margin: '8px' }}>
                                    <div>
                                        <h5>{val.MetaTitle}</h5>
                                        <div>RS.{val.SellingPrice}</div>
                                        <Space>
                                            {'1' == 1 ?
                                                <span ><DeleteOutlined /></span>
                                                :
                                                <span><Button>-</Button></span>}
                                            <span> 1 </span>
                                            <Button>+</Button>

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
                    <Button style={{ background: '#303d4e', color: '#fff', width: '90%', margin: '15px' }}>Go To Checklist</Button>
                </div>
            </div>
        </div>

    )
}



export default StackGridItem
