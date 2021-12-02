import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { useHorizontalScroll } from '../hooks';
import ajaxService from '../services/ajax-service';
// import { useHistory } from "react-router-dom";

const ScrollableCategories = ({ isMobileLayout }) => {

    const scrollRef = useHorizontalScroll();
    // let history = useHistory();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {

            let categoryResponse = await ajaxService.get('Category/Index');

            console.log(categoryResponse.data)

            let items = [];

            if (categoryResponse.data !== undefined && categoryResponse.data.Success) {
                categoryResponse.data.Payload.map(i => {
                    items.push(i.Name);
                    return i;
                });

                console.log(items)
                setCategories(items);
            }
        }

        getCategories();

    }, []);

    // const handleClick = (category) => {
    //     history.push({ pathname: '/search/category/' + category });
    // }

    return (
        <div >
            <div className="scrollmenu shadow px-sm-5" id="scrollmenu" ref={scrollRef} >
                <Menu>
                    {categories.map((category, index) => {
                        return <Menu.Item className="btn m-l-10 m-b-10" key={`category-` + index}  >
                            {category}
                        </Menu.Item>
                    })}
                </Menu>
            </div>
        </div>
    );
}

export default ScrollableCategories;