# 2fa (two factor authentication)



## Getting started
Speakeasy 2FA is a simple Node.js library for implementing Two-Factor Authentication (2FA) in your applications using the Time-based One-Time Password (TOTP) algorithm. It leverages the speakeasy library to generate and verify one-time passwords.


## Three types of users for authentication and claim authorisation to apis
. Admin
. Seller
. Buyer

## entry point route appRoute.js


## userRoute1 /createuser
This route creates a user with specified role (admin/seller/buyer)
req.body JSON required is- 
{
  "username":"youruserame",
  "password": "yourpassword",
  "role": "admin/seller/buyer"
}
  
## userRoute2 /loginuser
This route checks whether the user is registered in database and sends token for 2FA if user is found 
req.body JSON required is- 
{
"username": "ashutosh@gmail.com",
"password":"1234"
}

response in JSON
{
    "code": 200,
    "status": true,
    "message": "user passed. 2FA secret sent",
    "data": {
        "userid": "659106b14f52842e27073663",
        "token": "678274"
    }
}


## userRoute3 /verifyuser
This route verifies the 2fa token sent to user with the token saved in the database on time of generation. If the verification is successful, it sends a JWT token in response for futher requests authorisation. 
req.body JSON required is- 
{
  "userid": "659106b14f52842e27073663",
        "token": "678274"
}

response IN JSON
{
    "code": 200,
    "status": true,
    "message": "userverified and jwt token sent",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkxMDZiMTRmNTI4NDJlMjcwNzM2NjMiLCJpYXQiOjE3MDQxMTIxMDcsImV4cCI6MTczNTY0ODEwN30.cNM2a5s0aS0PqFq6WnteDW19Z6zITXS2qkPqDEgpw4c"
}
  

## UserRoute4 /viewusers
This route is secured with the middleware and only authenticated users having role as admin can proceed to view all users from this route.

## productRoute1 /addaproduct
This route is secured with the middleware and only authenticated users having role as seller can proceed to view all users from this route.



## productRoute2 /getallproducts
This route is secured with the middleware and only authenticated users having role as admin or buyer can proceed to view all users from this route.
