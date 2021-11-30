// import React, { useEffect, useState, createRef, useRef } from 'react'
// import OpenSearchService from '../services/opensearch-service';
// import { Card } from '../components';
// import ReactResizeDetector from 'react-resize-detector';
// import StackGrid, { transitions } from "react-stack-grid";

// const { scaleDown } = transitions;
// let items = [];


// function paginate(array, page_size, page_number) {
//     return array.slice((page_number - 1) * page_size, page_number * page_size);
// }

// const StackGridItem = ({ isMobileLayout, term, type }) => {

//     const [pins, setPins] = useState([]);
//     const [columnWidth, setColumnWidth] = useState();
//     const [gutterWidth, setGutterWidth] = useState();
//     const [start, setStart] = useState(1);
//     const gridContianer = createRef();
//     const stackGridContianer = useRef();

//     const handleScroll = (e) => {
//         const bottom = window.pageYOffset + window.innerHeight > document.body.clientHeight - 100;

//         if (bottom) {
//             setStart((start) => start + 1);
//         }
//     }

//     useEffect(() => {

//         const getSearchData = async () => {
//             setStart(1)
//             setPins([])
//             let response = null;
//             if (type === 'category' || type === 'term') {
//                 response = await OpenSearchService.search({ term, type });
//             } else if (type === 'product-group') {
//                 response = await OpenSearchService.trackProductGroup({ term });
//             } else if (type === 'design-group') {
//                 response = await OpenSearchService.trackDesignGroup({ term });
//             }

//             if (response.status === 200 && response.data !== null) {
//                 items = response.data.hits.hits;
//                 let stacks = paginate(items, 8, start);
//                 setPins(stacks);
//                 setStart((start) => start + 1);
//             }
//         }

//         // getSearchData();

//         let width = gridContianer.current.clientWidth;
//         let size = isMobileLayout ? width / 2 - 25 : width / 5 - 50;
//         let gutterWidth = isMobileLayout ? 10 : 30;

//         setColumnWidth(size);
//         setGutterWidth(gutterWidth);

//         window.addEventListener('scroll', handleScroll);

//         return () => window.removeEventListener('scroll', handleScroll);

//     }, [term, type]);

//     useEffect(() => {
//         setPins([...pins, ...paginate(items, 8, start)]);
//     }, [start])

//     return (
//         <div className={isMobileLayout ? "p15" : "p35"} style={{ marginTop: '20px', marginBottom: '80px' }} ref={gridContianer} >
//             <StackGrid
//                 ref={stackGridContianer}
//                 columnWidth={columnWidth}
//                 appear={scaleDown.appear}
//                 appearDelay={2000}
//                 gutterWidth={gutterWidth}
//                 gutterHeight={gutterWidth + 20}
//             >
//                 {
//                     pins.map((pin, index) => {
//                         return (
//                             <ReactResizeDetector
//                                 key={'pin-' + index}
//                                 handleWidth
//                                 handleHeight
//                                 onResize={() => {
//                                     if (stackGridContianer) {
//                                         stackGridContianer.current.updateLayout();
//                                     }
//                                 }}>
//                                 <Card item={pin} size="small" key={'pin-' + index} hover={!isMobileLayout} />
//                             </ReactResizeDetector>
//                         )
//                     })
//                 }
//             </StackGrid>
//         </div>
//     )
// }



// export default StackGridItem
