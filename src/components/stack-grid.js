import React, { useEffect, useState, createRef, useRef } from 'react'
import ajaxService from '../services/ajax-service';
import { Card } from '../components';
import ReactResizeDetector from 'react-resize-detector';
import StackGrid, { transitions } from "react-stack-grid";

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


    const handleScroll = (e) => {
        const bottom = window.pageYOffset + window.innerHeight > document.body.clientHeight - 100;

        if (bottom) {
            setStart((start) => start + 1);
        }
    }

    useEffect(() => {
        const getHomeData = async () => {
            let response = await ajaxService.post('Product/Search',{ Keyword : 'all' , Start : 0 , Length : 1000 });

            console.log(response)
            // if (response.status === 200 && response.data !== null) {
            //     items = response.data.hits.hits;
            //     let stacks = paginate(items, 8, start);
            //     setPins(stacks);
            //     setStart((start) => start + 1);
            // }
        }

        getHomeData();

        let width = gridContianer.current.clientWidth;
        let size = isMobileLayout ? width / 2 - 25 : width / 5 - 50;
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
        <div className={isMobileLayout ? "p15" : "p35"} style={{ marginTop: '20px', marginBottom: '80px' }} ref={gridContianer} >
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
    )
}



export default StackGridItem
