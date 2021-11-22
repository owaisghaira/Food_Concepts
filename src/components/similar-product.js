import React, { useEffect, useState, createRef } from 'react'
import OpenSearchService from '../services/opensearch-service';
import { Card } from '../components';

import StackGrid, { transitions } from "react-stack-grid";

const { scaleDown } = transitions;
let items = [];


function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const SimilarProduct = ({ isMobileLayout }) => {

    const [pins, setPins] = useState([]);
    const [columnWidth, setColumnWidth] = useState();
    const [gutterWidth, setGutterWidth] = useState();
    const [start, setStart] = useState(1);
    
    const gridContianer = createRef();

    useEffect(() => {
        const getHomeData = async () => {
            let response = await OpenSearchService.getHomeData();

            if (response.status === 200 && response.data !== null) {
                items = response.data.hits.hits;
                let stacks = paginate(items, 8, start);
                setPins(stacks);
                setStart((start) => start + 1);
            }            
        }

        getHomeData();

        let width = gridContianer.current.clientWidth;
        let size = isMobileLayout ? width / 2 - 25 : width / 5 - 50;
        let gutterWidth = isMobileLayout ? 10 : 30;

        setColumnWidth(size);
        setGutterWidth(gutterWidth);

    }, []);

    useEffect(() => {
        setPins([...pins, ...paginate(items, 8, start)]);
    }, [start])

    return (
        <div className={ isMobileLayout ? "p15" : "p35" } style={{ marginTop: '20px', marginBottom: '80px' }} ref={gridContianer} >
            <StackGrid
                columnWidth={columnWidth}
                appear={scaleDown.appear}
                appearDelay={2000}
                gutterWidth={gutterWidth}
                gutterHeight={gutterWidth+20}
            >
                {
                    pins.map((pin, index) => <Card item={pin} size="small" key={'pin-' + index} />)
                }
            </StackGrid>
        </div>
    )
}



export default SimilarProduct
