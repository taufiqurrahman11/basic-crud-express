# Basic CRUD Express

Basic express.js project with basic routes:
* Express
* Joi
* fs
---

## URL
SERVER
```
http://localhost:3030
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
## RESTful endpoints

### GET /all
Example
```
localhost:3030/all
```

> Get all

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_level>": [
	        "<data_role>": [
                {
                    <data_name>
                }
            ]
	      ],

        "<data_level>": [
	        "<data_role>": [
                {
                    <data_name>
                }
            ]
	      ]
        },

    "status": 200,
    "message": "Successfully get all data"
}
```

---

### GET /all/:level
Example
```
localhost:3030/all/employees
```

> Get By Level

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_level>": [
	        "<data_role>": [
                {
                    <data_name>
                }
            ]
	      ],
        },

    "status": 200,
    "message": "Successfully get data by level"
}
```

---

### GET /all/:level/:role/:name
Example
```
localhost:3030/all/managers/marketingLead/cania%20citta
```

> Get By Name

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "Cania Citta",
        "age": 34,
        "address": {
            "province": "Jawa Barat",
            "street": "Jl. beji timur"
        },
        "staff": 7
    },
    "status": 200,
    "message": "Successfully get data by name"
}
```
---

### POST /create/:level/:role
Example
```
localhost:3030/create/employees/backend
```

> Create Employee

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "Bedul",
    "age": 23,
    "address": {
        "province": "Sulawesi Selatan",
        "street": "Jl. jendral sudirman barat"
    }
}
```

_Response (201)_
```
{
    "data": {
        "name": "Bedul",
        "age": 23,
        "address": {
            "province": "Sulawesi Selatan",
            "street": "Jl. jendral sudirman barat"
        }
    },
    "status": 201,
    "message": "Succesfully create data"
}
```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"address.province\" is required"
}
```
_Response (400 - url level salah (employee/manager))_
```
{
    "status": 400
    "message": "Check again your level"
}
```
---

## POST /create/:level/:role
Example
```
localhost:3030/create/managers/marketingLead
```

> Create Manager

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "Cania Citta",
    "age": 33,
    "address": {
        "province": "Jawa Barat",
        "street": "Jl. beji timur"
    },
    "staff": 5
}
```

_Response (201)_
```
{
    "data": {
        "name": "Cania Citta",
        "age": 33,
        "address": {
            "province": "Jawa Barat",
            "street": "Jl. beji timur"
        },
        "staff": 5
    },
    "status": 201,
    "message": "Succesfully create data"
}
```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"staff\" is required"
}
```
_Response (400 - Already exist)_
```
{
    "status": 400,
    "message": "Data already exist"
}
```
_Response (400 - url level salah (employee/manager))_
```
{
    "status": 400
    "message": "Check again your level"
}
```
---

## PUT /all/:level/:role/:name
Example
```
localhost:3030/all/managers/marketingLead/cania%20citta
```

> Update Manager

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "Cania Citta",
    "age": 34,
    "address": {
        "province": "Jawa Barat updated",
        "street": "Jl. beji timur updated"
    },
    "staff": 7
}
```

_Response (200)_
```
{
    "data": {
        "name": "Cania Cittaa",
        "age": 34,
        "address": {
            "province": "Jawa Barat updated",
            "street": "Jl. beji timur updated"
        },
        "staff": 7
    },
    "status": 200,
    "message": "Successfully update data"
}
```
_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"staff\" is required"
}
```
_Response (404 - Not Found)_
```
{   
    "status" 404
    "message": "Data not found"
}
```
---

## DELETE /all/:level/:role/:name
Example
```
localhost:3030/all/employees/backend/bedul
```

> Delete manager or employee

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "Bedul",
        "age": 23,
        "address": {
            "province": "Sulawesi Selatan Updated",
            "street": "Jl. jendral sudirman barat updated"
        }
    },
    "status": 200,
    "message": "Succesfully delete data!"
}
```
_Response (404 - Not Found)_
```
{   
    "status" 404
    "message": "Data not found"
}
```
---

## GET /all/data?level={value}&role={value}&name={value}
Example
```
http://localhost:3030/all/data?level=employees&role=backend&name=joi
```

> Get name using query params

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "Joi",
        "age": 22,
        "address": {
            "province": "Jawa Timur",
            "street": "Jl. ijen makmur"
        }
    },
    "status": 200,
    "message": "Successfully get data using query parameter"
}
```
_Response (404 - Not Found)_
```
{   
    "status" 404
    "message": "Data not found"
}
```
---