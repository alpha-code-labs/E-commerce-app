
TESTING IN POSTMAN-


TIP - 
  ALL ROUTES ARE THROUGH API GATEWAY --USE API GATEWAY OR UPDATE ROUTES ACCORDINGLY

1//create a cart
```
POST http://localhost:8000/cart/api/create
```
```
{
  "userId": "64a2beda542569a29ef0b719"
}

```
STATUS--------------201
```
{
    "message": "Cart created",
    "cart": {
        "user": "64a2beda542569a29ef0b719",
        "_id": "64a69d76bcc598ca462fb34a",
        "items": [],
        "__v": 0
    }
}
```
2// Create a new cart item
```
POSThttp://localhost:8000/cart/api/createcartitem
```
```
{
  "userId": "64a2beda542569a29ef0b719",
  "productId": "64a52a55c2c314230fd5f47c",
  "quantity": 2
}
```
STATUS----------- 201
```
{
    "message": "Cart item created",
    "cart": {
        "_id": "64a69d76bcc598ca462fb34a",
        "user": "64a2beda542569a29ef0b719",
        "items": [
            {
                "product": "64a52a55c2c314230fd5f47c",
                "quantity": 2,
                "_id": "64a69eb3bcc598ca462fb34d"
            }
        ],
        "__v": 1
    }
}
```
3// Get cart items for a user
```
GET http://localhost:8000/cart/api/getcartitems/:userId
```
-----output
```
[
    {
        "_id": "64a7a77e24f5f5762ec553ea",
        "user": "64a6e7aef8abc59599c9aaf0",
        "items": [
            {
                "product": "64a6a65fd1b7f8c2dc5d3fcb",
                "quantity": 5,
                "_id": "64a7a8a0cc5140fca54455cb"
            }
        ],
        "__v": 1
    }
]
```
4 // Update the quantity of a cart item
```
 PUT http://localhost:8000/cart/api/updatequantity/:userId/:cartItemId
```
 req.body 
```
 { 
    "userId":"64a6e7aef8abc59599c9aaf0",
   "cartItemId":"64a7a8a0cc5140fca54455cb",
    "quantity":"2" 
}
```
output.body
```
 {
    "message": "Cart item quantity updated",
    "cart": {
        "_id": "64a7a77e24f5f5762ec553ea",
        "user": "64a6e7aef8abc59599c9aaf0",
        "items": [
            {
                "product": "64a6a65fd1b7f8c2dc5d3fcb",
                "quantity": 2,
                "_id": "64a7a8a0cc5140fca54455cb"
            }
        ],
        "__v": 1
    }
}
```
5  // Remove a cart item
```
DELETE http://localhost:8000/cart/api/removecartitem/:userId/:cartItemId
```
output.body-------------
```
{
    "message": "Cart item removed",
    "cart": {
        "_id": "64a6ab987a4710ccaccaf647",
        "user": "64a51fb518b1e50537bde392",
        "items": [
            {
                "product": "64a6a62cd1b7f8c2dc5d3fc5",
                "quantity": 6,
                "_id": "64a7b0ec0705bd7dec7200fc"
            }
        ],
        "__v": 3
    }
}
```
