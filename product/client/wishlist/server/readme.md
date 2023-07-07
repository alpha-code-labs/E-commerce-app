



// Create a completely new wishlist
POST http://localhost:8000/wishlist/api/64a51fb518b1e50537bde392 

{
  "userId": "64a51fb518b1e50537bde392"
}

// Create a new wishlist item within an existing wishlist
POST http://localhost:8000/wishlist/api/64a51fb518b1e50537bde392/items

{
  "product": "64a663f9005a8328f76a8dd9"
}
       output -
       ------------------------------------
       {
    "message": "Wishlist item created",
    "wishlist": {
        "_id": "64a67533c3720b92e9c0f7ab",
        "userId": "64a51fb518b1e50537bde392",
        "items": [
            {
                "product": "64a663f9005a8328f76a8dd9",
                "quantity": 1,
                "_id": "64a67586c3720b92e9c0f7b0"
            }
        ],
        "__v": 1
    }
}

//Update wishlist with new products:
POST http://localhost:8000/wishlist/api/64a51fb518b1e50537bde392

{
  "products": ["64a663f9005a8328f76a8dd9", "64a52b0ec2c314230fd5f48e", "64a52af5c2c314230fd5f48a"]
}

//Delete product from wishlist
DELETE http://localhost:8000/wishlist/api/64a67533c3720b92e9c0f7ab/items/64a663f9005a8328f76a8dd9
               update your url with   -- api/wishlistid/items/productid

output-----------------------------------

{
    "message": "Product deleted from the wishlist",
    "wishlist": {
        "_id": "64a67533c3720b92e9c0f7ab",
        "userId": "64a51fb518b1e50537bde392",
        "items": [
            {
                "product": "64a663f9005a8328f76a8dd9",
                "quantity": 1,
                "_id": "64a675bec3720b92e9c0f7b4"
            }
        ],
        "__v": 3
    }
}



// Delete a wishlist
DELETE http://localhost:8000/wishlist/api/64a6753ac3720b92e9c0f7ad
 -- UPDATE URL WITH WISHLIST URL 

 OUTPUT -
{
    "message": "Wishlist deleted"
}








