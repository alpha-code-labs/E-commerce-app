
//
const base_ms_inventory = `http://localhost:4009`
const base_ms_profile = 'http://localhost:4008'
const base_ms_customer = 'http://localhost:8001'
const base_ms_notification = 'http://localhost:4005'



 const  _URL = {
//for all products
products : `${base_ms_inventory}/api/consproduct`,

//for single product
product : `${base_ms_inventory}/api/product`,

//for customer login microservice
customerLogin : `${base_ms_customer}/api/customer/customer`,

//all wishlists
wishlists : `${base_ms_profile}/wishlist/getwishlists`,

//all wishlist items
wishlistItems : `${base_ms_profile}/wishlist/getall`,

//add to wishlist
wishlistAdd : `${base_ms_profile}/wishlist`,

//remove from wishlist
removeWishlistItem : `${base_ms_profile}/wishlist`,

//create cart
createCart : `${base_ms_profile}/cart/create`,

//update quuantity
updateQuantity : `${base_ms_profile}/cart/updatequantity`,

//create cart item
createCartItem : `${base_ms_profile}/cart/createcartitem`,

//all cart Items
cartItems : `${base_ms_profile}/cart/getcartitems`,


//remove cart Item
removeCartItem : `${base_ms_profile}/cart/removecartitem`,

//get all orders for a user orders
order : `${base_ms_profile}/orders2/getAllOrders`,

//all notifications
notifications : `${base_ms_notification}/publish-to-rabbitmq`,

//create wishlist
createWishlist : `${base_ms_profile}/wishlist`,

//delete wishlist item
deleteWishlistItem : `${base_ms_profile}/wishlist`,



}

export default _URL

