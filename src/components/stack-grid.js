import React, { useEffect, useState, createRef, useRef } from 'react'
import ajaxService from '../services/ajax-service';
import { Card ,Cart} from '../components';
import ReactResizeDetector from 'react-resize-detector';
import StackGrid, { transitions } from "react-stack-grid";
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

    // console.log(collections.length)
    const handleScroll = (e) => {
        const bottom = window.pageYOffset + window.innerHeight > document.body.clientHeight - 100;

        if (bottom) {
            setStart((start) => start + 1);
        }
    }

    /*
    public int AddressId { get; set; }
        public int PaymentMethod { get; set; }
        public int ShippingMethod { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public string Notes { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public double Shipping { get; set; }
        public List<CartItemPresenter> CartItems { get; set; }
        public string Password { get; set; }

        public class CartItemPresenter
    {
        public int ProductID { get; set; }
        public int VariantID { get; set; }
        public double SellingPrice { get; set; }
        public double Quantity { get; set; }
    }
    let cart = [
        { ProductID : 0 , VariantID : 0, SellingPrice : 200, Quantity : 2 },
        { ProductID : 0 , VariantID : 0, SellingPrice : 200, Quantity : 2 },
        { ProductID : 0 , VariantID : 0, SellingPrice : 200, Quantity : 2 },
        { ProductID : 0 , VariantID : 0, SellingPrice : 200, Quantity : 2 },
        { ProductID : 0 , VariantID : 0, SellingPrice : 200, Quantity : 2 },
    ]
    
    

    let setting = ['HasPOS','SplitAddress','DualPriceList','HasInvestor','EnablePickup','EnableDelivery','EnableScrollPagination'
'EnableEmailRegisteration',
'HasInventory',
'CustomerLedger']
    */


    useEffect(() => {

        const getHomeData = async () => {
 
            let response = await ajaxService.get('Product/Get');
            //let response = await ajaxService.get('Setting');
            // let response = await ajaxService.get('Brand');

            if (response != undefined && response.status === 200) {
                //  console.log('>>', response.data.Payload)
                items = response.data.Payload;
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
                    {!isMobileLayout &&  <Cart displayButtons={true}/>}
                  
                </div>
            </div>
        </div>

    )
}



export default StackGridItem
