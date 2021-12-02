import axios from 'axios';
//import store from '../../redux/store/index';
//import { showLoader, hideLoader } from '../../redux/actions/loaderAction';
//import ToastService from './toastService';
//import { loadToken, removeToken } from './sessionStorage';

export const GlobalVariable = Object.freeze({
    APP_VERSION: '1.0.0',
    BASE_API_URL: 'https://liveservices.eazyshop.net/api/',
    BASE_IMAGE_URL: 'https://live.eazyshop.net',
    CLIENT_TOKEN: 'JnP4FFS|YIcpEGBV0yBR2nu',
});

class AjaxService {

    constructor(url, data) {
        this.currentServiceCalls = 0;
        this.showLoader = false;
        this.currentLanguage = 'en';
        this.userToken = '';
        this.userObject = {};
        this.currentServiceRandomValue = 0;
    }

    getImage(url) {
        return `${GlobalVariable.BASE_IMAGE_URL}${url}`;
    }

    setUserObject(userObject) {
        this.userObject = userObject;
        localStorage.setItem('UserObject', JSON.stringify(userObject))
    }

    getUserObject() {
        return JSON.parse(localStorage.getItem('UserObject'));
    }

    removeUserToken() {
        this.userToken = '';
        this.userObject = null;
        localStorage.removeItem('UserToken')
        localStorage.removeItem('UserObject');
    }
    getVersionNumber() {
        return GlobalVariable.APP_VERSION;
    }

    initializeUserToken() {
        let token = localStorage.getItem('UserToken');
        let user = localStorage.getItem('UserObject');
        if (token && user) {
            this.userObject = JSON.parse(user);
            this.userToken = token;
        }
    }

    get(url, data) {
        return this.executeRequest(url, data, 'GET');
    }

    post(url, data) {
        return this.executeRequest(url, data, 'POST');
    }
    
    postWithImage(url, data, imageData) {
        return this.executeImageRequest(url, data, imageData, 'POST');
    }    

    postImage(urlImage, data, isBackground = false) {
        return this.createPromiseImage(urlImage, data, isBackground, 'POST');
    }

    put(url, data, isBackground = true) {
        return this.createPromise(url, data, isBackground, 'POST');
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateUrl(url) {
        return GlobalVariable.BASE_API_URL + url;
    }

    getHeaders() {
        //this.userToken = localStorage.getItem('UserToken');// temp for tessting only
        // headers.append('Accept-Language', this.getCurrentSetLanguage());
        //headers.append('X-Auth-Token', this.userToken);
        let headers = { 'X-Client-Token': GlobalVariable.CLIENT_TOKEN };
        return headers;
    }
    

    async executeImageRequest(url, data, imageData, type) {

        //store.dispatch(showLoader());

        let headers = {
            'X-Client-Token': GlobalVariable.CLIENT_TOKEN,
            'Content-Type': 'multipart/form-data'
        }

        // const sessionToken = await loadToken();

        // if (!(sessionToken === null)) {
        //     headers['X-Auth-Token'] = sessionToken;
        // }

        const uri = this.generateUrl(url);

        const bodyFormData = new FormData();

        bodyFormData.append("PaymentReceipt",imageData );
        bodyFormData.append("PlaceOrder",JSON.stringify(data) );

        let options = {
            method: type,
            url: uri,
            headers: headers,
            data: bodyFormData,
        }

        axios.interceptors.response.use(function (response) {
            //store.dispatch(hideLoader());
            return response;
        }, function (error) {
            //store.dispatch(hideLoader());
            return Promise.reject(error);
        });

        return axios(options);
    }

    async executeRequest(url, data, type) {

        let headers = {};

        if (type === 'POST') {
            headers = {
                'X-Client-Token': GlobalVariable.CLIENT_TOKEN,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        } else {
            headers = { 'X-Client-Token': GlobalVariable.CLIENT_TOKEN };
        }

        // const sessionToken = await loadToken();

        // if (!(sessionToken === null)) {
        //     headers['X-Auth-Token'] = sessionToken;
        // }

        const uri = this.generateUrl(url);

        let options = {
            method: type,
            url: uri,
            headers: headers,
            data: null,
        }

        if (type === 'GET') {
            options.params = data;
        } else if (type === 'POST') {
            options.data = JSON.stringify(data);
        }

        axios.interceptors.response.use(function (response) {
            //store.dispatch(hideLoader());
            return response;
        }, function (error) {
            //store.dispatch(hideLoader());
            if (401 === error.response.status) {
                
                if(error.config.url.includes('ogin') || error.config.url.includes('egister')){
                    //removeToken();
                    //ToastService.show('Invalid phone or password');
                }else{
                    //ToastService.show('Your session has been timed out. Please re login');
                }
            } else {
                return Promise.reject(error);
            }
        });          

        return axios(options);/*.then(response => {
            store.dispatch(hideLoader());
            return response;
        }).catch(function (error) {
            store.dispatch(hideLoader());
            ToastService.show(error);
        });
        */
    }

    getLocationInfo(lat, lng) {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=AIzaSyCIolxqgw2uHgM9q0rT9E17WqTzaMMiEo0`;

        let options = {
            method: 'GET',
            url: url,
        }

        return axios(options).then(response => {
            //store.dispatch(hideLoader());
            return response;
        }).catch(function (error) {
            //store.dispatch(hideLoader());

            //ToastService.show(error);
        });
    }
}

const ajaxService = new AjaxService();

export default ajaxService;