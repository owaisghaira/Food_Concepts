import ajaxService from './ajaxService';
import urlService from './urlService';
import { loadState, saveState } from './sessionStorage';
import AsyncStorage from '@react-native-community/async-storage';

class DataService {

    async getCategories(refresh) {

        if (refresh) {
            await ajaxService.get(urlService.getCategories).then(response => {
                saveState('categories', response.data.Payload);
            });

            return await loadState('categories');
        } else {
            let categories = await loadState('categories');

            getCartItem(0,()=>{
                
            });

            if (categories == null) {
                await ajaxService.get(urlService.getCategories).then(response => {
                    saveState('categories', response.data.Payload);
                });

                return await loadState('categories');
            } else {
                return categories;
            }
        }
    }

    async getHome(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getHome).then(response => {
                saveState('homeData', response.data.Payload);
            });

            return await loadState('homeData');
        } else {
            let homeData = await loadState('homeData');

            if (homeData == null) {
                await ajaxService.get(urlService.getHome).then(response => {
                    saveState('homeData', response.data.Payload);
                });

                return await loadState('homeData');
            } else {
                return homeData;
            }
        }
    }

    async getStore(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getStore).then(response => {
                saveState('store', response.data.Payload);
            });

            return await loadState('store');
        } else {
            let store = await loadState('store');

            if (store == null) {
                await ajaxService.get(urlService.getStore).then(response => {
                    saveState('store', response.data.Payload);
                });

                return await loadState('store');
            } else {
                return store;
            }
        }
    }

    async getPage(data, refresh) {
        let { slug } = data;

        if (refresh) {
            await ajaxService.get(urlService.getPage, data).then(response => {
                saveState(slug, response.data.Payload);
            });

            return await loadState(slug);
        } else {
            let page = await loadState(slug);

            if (page == null) {
                await ajaxService.get(urlService.getPage, data).then(response => {
                    saveState(slug, response.data.Payload);
                });

                return await loadState(slug);
            } else {
                return page;
            }
        }
    }

    async getPaymentMethods(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getPaymentMethods).then(response => {
                saveState('paymentMethods', response.data.Payload);
            });

            return await loadState('paymentMethods');
        } else {
            let paymentMethods = await loadState('paymentMethods');

            if (paymentMethods == null) {
                await ajaxService.get(urlService.getPaymentMethods).then(response => {
                    saveState('paymentMethods', response.data.Payload);
                });

                return await loadState('paymentMethods');
            } else {
                return paymentMethods;
            }
        }        
    }

    async getShippingMethods(refresh) {
        
        if (refresh) {
            await ajaxService.get(urlService.getShippingMethods).then(response => {
                saveState('shippingMethods', response.data.Payload);
            });

            return await loadState('shippingMethods');
        } else {
            let shippingMethods = await loadState('shippingMethods');

            if (shippingMethods == null || shippingMethods == undefined || shippingMethods.length == 0) {
                await ajaxService.get(urlService.getShippingMethods).then(response => {
                    saveState('shippingMethods', response.data.Payload);
                });

                return await loadState('shippingMethods');
            } else {
                return shippingMethods;
            }
        }        
    }

    async getCustomer(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getCustomer).then(response => {
                saveState('customer', response.data.Payload.Profile);
            });

            return await loadState('customer');
        } else {
            let customer = await loadState('customer');

            if (customer == null) {
                await ajaxService.get(urlService.getCustomer).then(response => {
                    saveState('customer', response.data.Payload.Profile);
                });

                return await loadState('customer');
            } else {
                return customer;
            }
        }          
    }

    async getAddresses(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getAddresses).then(response => {
                saveState('addresses', response.data.Payload);
            });

            return await loadState('addresses');
        } else {
            let addresses = await loadState('addresses');

            if (addresses == null) {
                await ajaxService.get(urlService.getAddresses).then(response => {
                    saveState('addresses', response.data.Payload);
                });

                return await loadState('addresses');
            } else {
                return addresses;
            }
        }           
    }

    async cacheAddress(address){
        let addresses = await loadState('addresses');
        addresses.push(address);
        saveState('addresses', addresses);
    }

    saveAddresses(addresses) {
        saveState('addresses', addresses);
    }

    saveCustomer(customer) {
        saveState('customer', customer);
    }

    async getPages(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getPages).then(response => {
                saveState('pages', response.data.Payload);
            });

            return await loadState('pages');
        } else {
            let pages = await loadState('pages');

            if (pages == null) {
                await ajaxService.get(urlService.getPages).then(response => {
                    saveState('pages', response.data.Payload);
                });

                return await loadState('pages');
            } else {
                return pages;
            }
        }        
    }

    getCheckout() {
        return ajaxService.get(urlService.checkout);
    }

    async saveDeviceToken(deviceToken) {
        await saveState('deviceToken', deviceToken);
    }

    async getDeviceToken() {
        return await loadState('deviceToken');
    }

    saveToken(token) {
        AsyncStorage.setItem('token', token);
    }

    async getToken() {
        const savedToken = await AsyncStorage.getItem('token').then(resp => {
            return resp;
        });

        return savedToken;
    }

    getImage(url) {
        return ajaxService.getImage(url);
    }

    getSearch(data) {
        return ajaxService.post(urlService.serchProducts, data);
    }

    getProduct(data) {
        return ajaxService.get(urlService.getProduct, data);
    }

    getIp() {
        return ajaxService.get(urlService.getIp);
    }

    getLogin(data) {
        return ajaxService.get(urlService.loginCustomer, data);
    }

    register(data) {
        return ajaxService.post(urlService.addCustomer, data);
    }


    forgotPassword(data) {
        return ajaxService.post(urlService.forgotPassword, data);
    }

    updatePassword(data) {
        return ajaxService.post(urlService.updatePassword, data);
    }

    updateProfile(data) {
        return ajaxService.post(urlService.updateCustomerProfile, data);
    }

    resetPassword(data) {
        return ajaxService.post(urlService.updateCustomerPassword, data);
    }

    saveAddress(data, edit) {
        let url = edit ? urlService.updateAddress : urlService.addAddress;
        return ajaxService.post(url, data);
    }

    deleteAddress(addressId) {
        return ajaxService.get(urlService.removeAddress, addressId);
    }

    async getWishlist(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getWishlistItems).then(response => {
                saveState('wishlist', response.data.Payload);
            });

            return await loadState('wishlist');
        } else {
            let wishlist = await loadState('wishlist');

            if (wishlist == null) {
                await ajaxService.get(urlService.getWishlistItems).then(response => {
                    saveState('wishlist', response.data.Payload);
                });

                return await loadState('wishlist');
            } else {
                return wishlist;
            }
        }
    }

    removeWishlistItem(data) {
        return ajaxService.get(urlService.removeWishlistItem, data);
    }

    toggleWishlist(data, isRemove) {
        let url = isRemove ? urlService.addWishlistItem : urlService.removeWishlistItem;
        return ajaxService.get(url, data);
    }

    placeOrder(data,imageData) {
        return ajaxService.postWithImage(urlService.placeOrder, data,imageData);
    }

    getOrders() {
        return ajaxService.get(urlService.getOrders)
    }

    getOrderDetails(orderNumber) {
        let url = `${urlService.getOrderDetails}?orderNumber=${orderNumber}`;
        return ajaxService.get(url);
    }

    cancelOrder(id) {
        let url = `${urlService.cancelOrder}?id=${id}`;
        return ajaxService.get(url);
    }

    getLocationInfo(lat, lng) {
        return ajaxService.getLocationInfo(lat, lng);
    }

    verifyQuantity(data) {
        return ajaxService.post(urlService.verifyQuantity, data);
    }
    
    async getLastOrder(refresh){
        if (refresh) {
            await ajaxService.get(urlService.getLastOrder).then(response => {
                saveState('lastOrder', response.data.Payload);
            });

            return await loadState('lastOrder');
        } else {
            let lastOrder = await loadState('lastOrder');

            if (lastOrder == null) {
                await ajaxService.get(urlService.getLastOrder).then(response => {
                    saveState('lastOrder', response.data.Payload);
                });

                return await loadState('lastOrder');
            } else {
                return lastOrder;
            }
        }
    } 
    
    async uploadImage(data){
        return await ajaxService.postImage(urlService.uploadImage,data).then(response => {
            return response.data.Payload
        });
    }
    
    async getSettings(refresh) {
        if (refresh) {
            await ajaxService.get(urlService.getSettings).then(response => {
                saveState('appSettings', response.data.Payload);
            });

            return await loadState('appSettings');
        } else {
            let appSettings = await loadState('appSettings');

            if (appSettings == null) {
                await ajaxService.get(urlService.getSettings).then(response => {
                    saveState('appSettings', response.data.Payload);
                });

                return await loadState('appSettings');
            } else {
                return appSettings;
            }
        }        
    }

    async getCharges(data){
        return await ajaxService.post(urlService.calculateShipping, data).then(response => {
            return response.data.Payload;
        });
    }
}

const dataService = new DataService();

export default dataService;