

//COnversion from one currency to another 
get http://localhost:8080/api/currency/convert?from=USD&to=EUR&amount=50


{
    "from": "USD",
    "to": "EUR",
    "amount": "50",
    "convertedAmount": 44.562000000000005
}