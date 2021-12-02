const getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

let initialState = [{
    name: '',
    phone: '',
    notes: '',
    latitude: '',
    longitude: '',
    address: '',
    orderNumber: getRandomString(5),
    items: [],
    reviewGiven: false
}];

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VISITED_COLLECTION': {
            let { key } = action.payload;
            let collections = state.map(collection => {
                if (collection.key === key) {
                    collection.hasNew = false;
                }
                return collection;
            });

            return [...collections];
        }
        case 'IMPORT_COLLECTION': {
            let { collection_name, items, id } = action.payload;

            let importedCollection = state.map(collection => collection.key === id)[0];

            if (!importedCollection) {
                return [...state, { name: collection_name, items: [...items], key: id, hasNew: true }];
            }

            return state;
        }
        case 'CREATE_COLLECTION': {
            // let data = action.payload;
            // let ct = {
            //     name: name,
            //     key: getRandomString(5),
            //     items: [],
            //     hasNew: false
            // }
            // if (item != null) {
            //     ct.items.push(item);
            //     ct.hasNew = true;
            // }
            return [...state, action.payload];
        }
        case 'CREATE_FIRST_COLLECTION': {
            let ct = {
                name: 'My First Collection',
                key: getRandomString(5),
                items: [],
                hasNew: false
            }
            if (action.payload != null) {
                ct.items.push(action.payload);
                ct.hasNew = true;
            }
            return [...state, ct];
        }
        case 'RENAME_COLLECTION': {
            let { key, name } = action.payload;
            let collections = state.map(collection => {
                if (collection.key === key) {
                    collection.name = name;
                }
                return collection;
            });

            return [...collections];
        }
        case 'REMOVE_COLLECTION': {
            return [...state.filter(collection => collection.key !== action.payload.key)];
        }
        case 'ADD_ITEM': {
            let { key, item } = action.payload;

            let collections = state.map(collection => {
                if (collection.key === key) {
                    let filteredItem = collection.items.filter(i => i.id === item.id);
                    if (filteredItem.length == 0) {
                        return {
                            ...collection,
                            items: [...collection.items, item],
                            hasNew: true
                        }
                    }
                    return { ...collection }
                } else {
                    return { ...collection };
                }
            });

            return [...collections];
        }
        case 'REMOVE_ITEm': {
            let { key, id } = action.payload;
            let collections = state.map(collection => {
                if (collection.key === key) {
                    return {
                        ...collection,
                        items: [...collection.items.filter(i => i.id !== id)],
                    }
                } else {
                    return collection;
                }
            });

            return [...collections];
        }
        default:
            return state;
    }
}

export default collectionReducer;