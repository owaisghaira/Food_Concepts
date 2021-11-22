import React, { useEffect, useState } from 'react'
import { useHorizontalScroll } from '../hooks';
import OpenSearchService from '../services/opensearch-service';
import { useHistory } from "react-router-dom";

const ScrollableCategories = ({ isMobileLayout }) => {

    const scrollRef = useHorizontalScroll();
    let history = useHistory();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            let response = await OpenSearchService.getCategories();
            let items = [];

            if (response.status === 200 && response.data !== null) {
                //hits/hits/_source/product_type_name
                response.data.hits.hits.map(i => {
                    items.push(i._source.product_type_name);
                    return i;
                });

                setCategories(items);
            }
        }

        // getCategories();
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