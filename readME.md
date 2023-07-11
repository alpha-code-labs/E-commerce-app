

-CART AND ORDER MICROSERVICES ARE COMBINED TOGETHER TO MAKE THE ROUTES WORK.
// Create a new order
POST http://localhost:8000/orders/api/createOrder

req.body------------
{
  "userId": "64a2beda542569a29ef0b719",
  "cartId": "64a69d76bcc598ca462fb34a",
  "shippingAddress": "123 Main St, sector 34, gurugram",
  "contactNumber": "993732718278",
  "email": "sumesh@gmail.com",
  "additionalNotes": "Give it to watchman"
}

output -----------------
{
    "message": "Order created",
    "order": {
        "userId": "64a2beda542569a29ef0b719",
        "paymentStatus": "Pending",
        "orderStatus": "Placed",
        "shippingAddress": "123 Main St",
        "contactNumber": "1234567890",
        "email": "example@example.com",
        "additionalNotes": "Optional additional notes",
        "_id": "64ad2dad5f31efcdb138cfe0",
        "orderDate": "2023-07-11T10:23:41.270Z",
        "__v": 0
    }
}

// Get order details
GET http://localhost:8000/orders/api/:orderid

{
    "orderId": "64ad2dad5f31efcdb138cfe0",
    "orderStatus": "Placed",
    "paymentStatus": "completed",
    "shippingAddress": "123 Main St",
    "contactNumber": "1234567890",
    "email": "example@example.com",
    "additionalNotes": "Optional additional notes"
}

