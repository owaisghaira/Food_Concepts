import React, { useEffect, useState } from 'react'
import { useHorizontalScroll } from '../hooks';
import OpenSearchService from '../services/opensearch-service';
import ajaxService from '../services/ajax-service';
import { useHistory } from "react-router-dom";

const ScrollableCategories = ({ isMobileLayout }) => {

    const scrollRef = useHorizontalScroll();
    let history = useHistory();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {

            let categoryResponse = await ajaxService.get('Category/Index');

            console.log(categoryResponse)
  
            let items = [];

            if (categoryResponse != undefined && categoryResponse.Success) {
                categoryResponse.Payload.map(i => {
                    items.push(i.Name);
                    return i;
                });

                console.log(items)
                setCategories(items);
            }
        }

        getCategories();

    }, []);

    const handleClick = (category) => {
        history.push({ pathname: '/search/category/' + category });
    }

    return (
        <div className={isMobileLayout ? "p15" : "p35"} >
            <div className="scrollmenu" id="scrollmenu" ref={scrollRef} >
                {categories.map((category, index) => {
                    return <span className="btn m-l-10 m-b-10" onClick={() => handleClick(category)} key={`category-` + index}  >{category}</span>
                })}
            </div>
        </div>
    );
}

export default ScrollableCategories;