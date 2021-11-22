import React, { useEffect, useState } from 'react'
import OpenSearchService from '../services/opensearch-service';
import { Card } from '../components'

const MobileStackGrid = () => {

    const [pins, setPins] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            let response = await OpenSearchService.getHomeData();

            let items = [];

            if (response.status === 200 && response.data !== null) {
                response.data.hits.hits.map(i => {
                    let row = {
                        thumbnail: i._source.item_image.thumbnail,
                        description: i._source.item_short_description,
                        title: i._source.item_title,
                    }

                    items.push(row);
                    return i;
                });

                setPins(items);
            }
        }

        getHomeData();

    }, []);


    return (
        <div style={styles.pin_container}>
            {
                pins.map((pin, index) => <Card {...pin} size="small" key={'pin-' + index} />)
            }
        </div>
    )
}

const styles = {
    pin_container: {
        margin: 0,
        padding: 0,
        width: window.innerWidth,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 160px)',
        gridAutoRows: '10px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        justifyContent: 'center',
    }
}

export default MobileStackGrid
