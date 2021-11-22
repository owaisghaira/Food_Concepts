// import ajaxService from './ajax-service';
// import mixpanelService from './mixpanel-service';

// class OpenSearchService {

//     async getHomeData() {
//         mixpanelService.trackHome();
//         return await ajaxService.get('home');
//     }

//     async getCategories() {
//         return await ajaxService.get('categories');
//     }

//     async search({term, type}) {
//         if (type === 'category') {
//             mixpanelService.searchByType(term);
//         }
//         return await ajaxService.get('search', {term});
//     }

//     async getProductsByType(name) {
//         mixpanelService.searchByType(name);
//         return await ajaxService.get('product-type', name);
//     }

//     getProductDetail(item_website_design_code, id) {
//         mixpanelService.trackProduct(item_website_design_code, id);
//     }

//     trackProductTag(){
//         mixpanelService.trackProductTag()
//     }

//     async getSimilarProducts(data) {
//         return await ajaxService.get('similiar-products', data);
//     }

//     trackExplore() {
//         mixpanelService.trackExplore();
//     }

//     async getExploreProducts() {
//         return await ajaxService.get('explore-products');
//     }

//     async getExploreDesigns() {
//         return await ajaxService.get('explore-designs');
//     }

//     async trackProductGroup(data) {
//         mixpanelService.trackProductGroup(data);
//         return await ajaxService.get('product-group', data);
//     }

//     async trackDesignGroup(data) {
//         mixpanelService.trackDesignGroup(data);
//         return await ajaxService.get('design-group', data);
//     }

//     async submitForm(data,total){
//         mixpanelService.submitQuoteForm(total);
//         return await ajaxService.post('submit-quote',data);
//     }

//     async getCollection(code){
//         return await ajaxService.get('get-collection',{code});
//     }
// }

// const openSearchService = new OpenSearchService();

// export default openSearchService;
