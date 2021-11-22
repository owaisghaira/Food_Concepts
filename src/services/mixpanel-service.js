// import mixpanel from 'mixpanel-browser';

// mixpanel.init('e7c8d2c9f9a0b927354245167206f240');

// class MixPanelService {

//     trackHome() {
//         mixpanel.track("Land")
//     }

//     searchByType(name) {
//         mixpanel.track("Search By Type", {
//             "Product Type": name
//         })
//     }

//     trackProduct(item_website_design_code, id) {
//         mixpanel.track("Click On Item", {
//             "Website Design Code": item_website_design_code,
//             "item_id": id
//         })
//     }

//     trackExplore() {
//         mixpanel.track("Explore")
//     }

//     trackProductGroup(product_group_name) {
//         mixpanel.track("Click On Group", {
//             "Group Type": "Product",
//             "Group Name": product_group_name
//         })
//     }

//     trackDesignGroup(design_group_name) {
//         mixpanel.track("Click On Group", {
//             "Group Type": "Design",
//             "Group Name": design_group_name
//         })
//     }

//     trackProductTag() {
//         mixpanel.track("Product Page - Related Tags")
//     }

//     trackCollection() {
//         mixpanel.track("My Collections")
//     }

//     addNewCollection() {
//         mixpanel.track("Create New Collection")
//     }

//     quickAddNewCollection() {
//         mixpanel.track("Quick Create New Collection")
//     }

//     quickAddToCollection(id, item_website_design_code) {
//         mixpanel.track("Quick Add to Collection", {
//             "item_id": id,
//             "Website Design Code": item_website_design_code
//         })
//     }

//     addToCollection(id, item_website_design_code) {
//         mixpanel.track("Add to Collection", {
//             "item_id": id,
//             "Website Design Code": item_website_design_code
//         })
//     }

//     removeFromCollection(id, item_website_design_code) {
//         mixpanel.track("Remove From Collection", {
//             "Website Design Code": (item_website_design_code),
//             "item_id": (id)
//         })
//     }

//     quickRemoveFromCollection(id,item_website_design_code) {
//         mixpanel.track("Quick Remove From Collection", {
//             "Website Design Code": (item_website_design_code),
//             "item_id": (id)
//         })
//     }

//     requestQuoteForm(total) {
//         mixpanel.track("Request Quote Form", {
//             "Number of Items": total
//         })
//     }

//     submitQuoteForm(total) {
//         mixpanel.track("Request Quote Form Submit", {
//             "Number of Items": total
//         })
//     }
// }

// const mixpanelService = new MixPanelService();

// export default mixpanelService;