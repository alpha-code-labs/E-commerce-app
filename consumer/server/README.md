//This readme file is for ADMIN MICROSERVICE

<<<<<<< HEAD
API ROUTES FOR POSTMAN TESTING
=======
API ROUTES FOR POSTMAN TESTING 
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204

//SIGNUP
URL: POST http://localhost:8000/api/admin/signup

REQUEST BODY:
{
<<<<<<< HEAD
"username": "anandhu",
"password": "Anandhu@1996",
"email": "anandhu@gmail.com"
=======
  "username": "neo9050",
  "password": "abcd1234",
  "email": "neo9050@gmail.com"
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204
}

//login
URL: POST http://localhost:8000/api/admin/login

<<<<<<< HEAD
request body
{
"email": "neo9050@gmail.com",
"password": "abcd1234"
=======
request body 
{
  "email": "neo9050@gmail.com",
  "password": "abcd1234"
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204
}

//Protected Route (Profile Page)

URL: GET http://localhost:8000/api/admin/protected

key: Token
value: JWT tOKEN RECEIVED FROM LOGIN

//Create .env file
<<<<<<< HEAD
.env file
MONGO_URI=mongodb+srv://username:dfgh77@cluster0.jv9dkvw.mongodb.net/?retryWrites=true&w=majority
PORT=8000
JWT_SECRET=abcdafhg!@#$1234
=======
.env file 
MONGO_URI=mongodb+srv://username:dfgh77@cluster0.jv9dkvw.mongodb.net/?retryWrites=true&w=majority
PORT=8000
JWT_SECRET=abcdafhg!@#$1234
>>>>>>> 07106be0b76c74be140434bfb8ab9ad52101d204
