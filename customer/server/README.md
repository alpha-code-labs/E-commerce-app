create a .env file in your project's root directory and define your environment variables:

example - .env file 
PORT=8000
MONGO_URI=mongodb+srv://name:password34@cluster0.jv9dkvw.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret


Signup Request: PostMan

Method: POST
URL: http://localhost:8000/api/customer/signup
Body (JSON): json

{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "mypassword",
  "phone": "1234567890"
}

Login Request: Postman 

Method: POST
URL: http://localhost:8000/api/customer/login
Body (JSON):json

{
  "email": "johndoe@example.com",
  "password": "mypassword"
}
