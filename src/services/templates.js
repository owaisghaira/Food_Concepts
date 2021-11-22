export const homeTemplate = {
    "size": 1000,
    "query": {
        "bool": {
            "should": [
                {
                    "match_all": {}
                }
            ],
            "must": [
                {
                    "term": {
                        "item_show_on_website": true
                    }
                },
                {
                    "term": {
                        "item_hide_in_home_page": false
                    }
                },
                {
                    "nested": {
                        "path": "item_design_group",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "term": { "item_design_group.design_group_show_on_website": true }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "nested": {
                        "path": "item_product_group",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "term": { "item_product_group.product_group_show_on_website": true }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    }
};

//export const homeTempalte;