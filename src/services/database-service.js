function initializeDb() {
    var db = openDatabase('pos', '1.0', 'Database to manage cart', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE CartItem');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CartItem (ProductID INTEGER, VariantID INTEGER, Name TEXT, SellingPrice REAL, SKU TEXT, Barcode TEXT, Quantity INTEGER,AllowDiscount INTEGER, Notes TEXT,Discount REAL, DiscountType INTEGER, DiscountValue REAL  )');
        console.log('Table created successfully');
    });
    return db;
}

function insertCartItem(db, cartItem,callback) {
    const query = `INSERT INTO CartItem (ProductID, VariantID, Name, SellingPrice, SKU, Barcode, Quantity,AllowDiscount, Notes,Discount, DiscountType, DiscountValue) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    const params = [cartItem.ProductID, cartItem.VariantID, cartItem.Name, cartItem.SellingPrice, cartItem.SKU, cartItem.Barcode, cartItem.Quantity, cartItem.AllowDiscount ? 1 : 0, cartItem.Notes, cartItem.Discount, cartItem.DiscountType, cartItem.DiscountValue]

    db.transaction(function (tx) {
        tx.executeSql(query, params, function () { console.log('inserted item into cartitem table'); callback(); }, function (transaction, error) { console.log(error) });
    });
}

function getCartItem(db, productId,callback) {
    const query = `SELECT * FROM CartItem WHERE ProductID = ?`;
    const params = [productId];

    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows.length > 0) {
                callback([results.rows.item(0)]);
            } else {
                callback([]);
            }
        });
    });
}

function getAllCartItem(db,callback) {
    const query = `SELECT * FROM CartItem`;
    const params = []


    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows.length > 0) {
                var data = [];

                for (i = 0; i < results.rows.length; i++) {
                    data.push(results.rows.item(i));
                } 

                callback(data);
            } else {
                callback([]);
            }
        });
    });
}

function updateCartItem(db, cartItem,callback) {
    const query = `UPDATE CartItem SET Quantity = ? , AllowDiscount = ? , Notes = ? , Discount = ? , DiscountType = ? , DiscountValue = ?, SellingPrice = ? WHERE ProductID = ?`
    const params = [cartItem.Quantity, cartItem.AllowDiscount ? 1 : 0, cartItem.Notes, cartItem.Discount, cartItem.DiscountType, cartItem.DiscountValue, cartItem.SellingPrice  , cartItem.ProductID]

    db.transaction(function (tx) {
        tx.executeSql(query, params, function () { console.log('updated item into cartitem table'); callback(); }, function (transaction, error) { console.log(error) });
    });
}

function removeCartItem(db,id,callback) {
    const query = `DELETE FROM CartItem WHERE ProductID = ?`;
    const params = [id]

    db.transaction(function (tx) {
        tx.executeSql(query, params, function () { console.log('cartitem has been removed'); callback(); }, function (transaction, error) { console.log(error) });
    });
}

function truncateCartItems(db, callback) {
    const query = `DELETE FROM CartItem`;
    const params = []

    db.transaction(function (tx) {
        tx.executeSql(query, params, function () { console.log('cartitem table has been truncated');callback() }, function (transaction, error) { console.log(error) });
    });
}