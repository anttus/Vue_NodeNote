"use strict";
const pool = require("../../db/database");

// Returns a new promise that resolves the sql query results
async function getPromise(query, res) {
  return new Promise(async function(resolve, reject, err) {
    let result = await pool.query(query);
    resolve(result);
  })
    .catch(err => {
      throw new Error(err);
    })
    .catch(err => {
      throw new Error(err);
    });
}

// async function asyncForEach(array, callback) {
//     for (let index = 0; index < array.length; index++) {
//         await callback(array[index], index, array)
//     }
// }

//  GET /api/lists?userId=userId
exports.all_lists_of_user = async (req, res, err) => {
  let userId = req.query["userId"] || "null";
  let query =
    "SELECT * FROM Lists WHERE List_id IN (SELECT ListId FROM UserLists WHERE UserId = '" +
    userId +
    "');";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// GET /api/lists/:id
exports.list_by_id = (req, res, err) => {
  let listId = req.url.slice(11);
  let query = "SELECT * FROM Lists WHERE List_id = " + listId + ";";
  getPromise(query, res)
    .then(result => {
      res.send(result).catch(err => {
        throw new Error(err);
      });
    })
    .catch(err => {
      throw new Error(err);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// PATCH /api/lists?listId=LIST_ID&newName=NEW_NAME
exports.list_name_change = (req, res, err) => {
  let listId = req.query["listId"] || "null";
  let newName = req.query["newName"] || "null";
  let query =
    " UPDATE Lists SET Name = '" +
    newName +
    "' WHERE List_id = " +
    listId +
    ";";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    })
    .catch(err => {
      throw new Error(err);
    }); // ???
};

// PUT /api/lists/user?userId=USER_ID&listName=LIST_NAME
exports.create_list = (req, res, err) => {
  let userId = req.query["userId"] || "null";
  let listName = req.query["listName"] || "null";
  let query1 =
    "INSERT INTO Lists (User_id, Name) VALUES ('" +
    userId +
    "', '" +
    listName +
    "');";
  getPromise(query1, res)
    .then(result => {
      res.send(result);
      res.end();
      let query3 =
        "INSERT INTO UserLists (UserId, ListId) VALUES ('" +
        userId +
        "', (SELECT List_id FROM Lists WHERE User_id = '" +
        userId +
        "' AND Name = '" +
        listName +
        "'));";
      getPromise(query3, res)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          throw new Error(err);
        });
    })
    .catch(err => {
      throw new Error(err);
    });
};

// PUT /api/lists/users/shared?email=EMAIL&listId=LIST_ID
exports.share_list = (req, res, err) => {
  let email = req.query["email"] || "null";
  let listIdOrig = req.query["listId"] || "null";
  let query =
    "INSERT INTO UserLists (UserId, ListId) VALUES ((SELECT User_id FROM Users WHERE email = '" +
    email +
    "'), (SELECT List_id FROM Lists WHERE List_id = '" +
    listIdOrig +
    "'));";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// GET /api/lists/users/shared?listId=LIST_ID
exports.get_shared_users = (req, res, err) => {
  let listId = req.query["listId"] || "null";
  let query =
    "SELECT email FROM Users WHERE User_id IN (SELECT UserId FROM UserLists WHERE ListId = '" +
    listId +
    "');";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// GET /api/items?listId=listId
exports.all_items_of_list = (req, res, err) => {
  let listId = req.query["listId"] || "null";
  let query = "SELECT * FROM Items WHERE List_id = " + listId + ";";
  getPromise(query, res)
    .then(result => {
      if (result == null) res.send("Empty");
      else res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// DELETE /api/lists/<LIST_ID>
// Deletes the list and every item on it
exports.delete_list = (req, res, err) => {
  let listId = req.url.slice(11);
  let query1 = "DELETE FROM UserLists WHERE ListId = " + listId + ";";
  getPromise(query1, res)
    .then(result => {
      let query2 = "DELETE FROM Items WHERE List_id = " + listId + ";";
      getPromise(query2, res)
        .then(result => {
          let query3 = "DELETE FROM Lists WHERE List_id = " + listId + ";";
          getPromise(query3, res)
            .then(result => {
              res.end();
            })
            .catch(err => {
              throw new Error(err);
            });
          res.end();
        })
        .catch(err => {
          throw new Error(err);
        });
      res.end();
    })
    .catch(err => {
      throw new Error(err);
    });
};

// Some method for checking if the item already exists in the list?
// PUT /api/items?name=<ITEM_NAME>&listId=<LIST_ID>
exports.add_item = (req, res, err) => {
  let itemName = req.query["name"] || "null";
  let listId = req.query["listId"] || "null";
  let query =
    "INSERT INTO Items (Name, List_id) VALUES ('" +
    itemName +
    "', " +
    listId +
    ");";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// PATCH /ap/items?itemId=ITEM_ID&newName=NEW_NAME
exports.item_name_change = (req, res, err) => {
  let itemId = req.query["itemId"] || "null";
  let newName = req.query["newName"] || "null";
  let query =
    " UPDATE Items SET Name = '" +
    newName +
    "' WHERE Item_id = " +
    itemId +
    ";";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    })
    .catch(err => {
      throw new Error(err);
    }); // ???
};

// DELETE /api/items?listId=LIST_ID&itemId=ITEM_ID&itemName=ITEM_NAME
exports.delete_item = (req, res, err) => {
  let listId = req.query["listId"] || "null";
  let itemId = req.query["itemId"] || "null";
  let itemName = req.query["itemName"] || "null";
  let query =
    "DELETE FROM Items WHERE List_id = " +
    listId +
    " AND Item_id = " +
    itemId +
    " AND Name = '" +
    itemName +
    "';";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// GET /api/users
exports.get_users = (req, res, err) => {
  let query = "SELECT * FROM Users;";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// PUT /api/users?userId=<USER_ID>&email=<EMAIL>
exports.add_user = (req, res, err) => {
  let userId = req.query["userId"] || "null";
  let email = req.query["email"] || "null";
  let query =
    " INSERT INTO Users (User_id, email) SELECT * FROM (SELECT '" +
    userId +
    "', '" +
    email +
    "') AS tmp WHERE NOT EXISTS (SELECT User_id FROM Users WHERE User_id = '" +
    userId +
    "');";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// DELETE /api/users?userId=<USER_ID>
exports.delete_user = (req, res, err) => {
  let userId = req.query["userId"] || "null";
  let query = "DELETE FROM Users WHERE User_id = '" + userId + "';";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// PATCH /api/items/status?itemId=<ITEM_ID>&completed=<1/0>
exports.item_status = (req, res, err) => {
  let itemId = req.query["itemId"] || "null";
  let completed = req.query["completed"] || "null";
  let query =
    "UPDATE Items SET Completed = '" +
    completed +
    "' WHERE Item_id = '" +
    itemId +
    "';";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};

// GET /api/users/ifexists?email=<EMAIL>
exports.user_exists = (req, res, err) => {
  let email = req.query["email"] || "null";
  let query = "SELECT COUNT(*) FROM Users WHERE email = '" + email + "';";
  getPromise(query, res)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      throw new Error(err);
    });
};
