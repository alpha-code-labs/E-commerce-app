

postman
//For uploading excell files using .xlsx
post http://localhost:8004/api/upload

form.data

upload .xlsx file



//for creating Groups
Post http://localhost:8004/api/group
{
  "employeeName":"June",
  "designation": "Manager",
  "department": "IT",
  "grade": "A",
  "noOfYears": 5
}
