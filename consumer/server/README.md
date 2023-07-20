//This readme file is for ADMIN MICROSERVICE

API ROUTES FOR POSTMAN TESTING 

//SIGNUP
URL: POST http://localhost:8000/api/admin/signup

REQUEST BODY:
{
  "username": "neo9050",
  "password": "abcd1234",
  "email": "neo9050@gmail.com"
}

//login
URL: POST http://localhost:8000/api/admin/login

request body 
{
  "email": "neo9050@gmail.com",
  "password": "abcd1234"
}

//Protected Route (Profile Page)

URL: GET http://localhost:8000/api/admin/protected

key: Token
value: JWT tOKEN RECEIVED FROM LOGIN

//Create .env file
.env file 
MONGO_URI=mongodb+srv://username:dfgh77@cluster0.jv9dkvw.mongodb.net/?retryWrites=true&w=majority
PORT=8000
JWT_SECRET=abcdafhg!@#$1234