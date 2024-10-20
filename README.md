# Daseas
Daseas is an application for people to who want to buy cloths: 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

# Not active because of limit from AWS
>Url: http://www.daseas.cloud/

# RESTful endpoints
## For Public

### GET /pub/products

> Get all the product list

_Request Body_
```
not needed
```

_Response (200 - success)_
```
{
  "current_page": "1",
  "data": [
    {
      "id": "<product_id>",
      "name": "<product_name>",
      "description": "<product_description>",
      "price": "<product_price>",
      "stock": "<product_stock>",
      "imgUrl": "<product_imgUrl>",
      "categoryId": "<product_categoryId>",
      "authorId": "<product_authorId>",
      "createdAt": "2024-08-22T13:45:12.650Z",
      "updatedAt": "2024-08-23T06:32:59.286Z"
    }
  ],
  "totalData": "<total_product_count>",
  "totalPage": "<total_product_page>"
}

```


### GET /pub/products/:id

>Get product with specified id

_Request Params_
```
product id
```

_Response (200 - Success)_

```
{
  "message": "Success getting product with id of <product_id>",
  "data": {
    "id": "<product_id>",
    "name": "<product_name>",
    "description": "<product_description>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "imgUrl": "<product_imgUrl>",
    "categoryId": "<product_categoryId>",
    "authorId": "<product_authorId>",
    "createdAt": "2024-08-22T13:45:12.650Z",
    "updatedAt": "2024-08-23T06:32:59.286Z"
  }
}

```

_Response (404)_
```
{
    "message": "Data is not Found!"
}

```
## For Users

### POST /login

>login to access feature
_Request Body_
```
{
  "email": "<email that already been registered>",
  "password": "<password that associated with the email>"
}
```

_Response (200 - Success)_
```
{
    "access_token": "<your access_token>"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid username/password"
}
```

### POST /add_user
>only viable to admin to add new user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username": "<username to be registered>"
  "email": "<email to be registered>",
  "password": "<password to be registered>",
  "phoneNumber": "<phoneNumber to be registered>",
  "address": "<address to be registered>"
}
```
_Response (201 - Created)_
```
{
  "message": "Success creating new User",
  "data": {
    "id": "<user_id>",
    "username": "<user_username>",
    "email": "<user_email>",
    "role": "<user_role>",
    "phoneNumber": "<user_phoneNumber>",
    "address": "<user_address>",
    "createdAt": "2024-08-24T17:39:53.022Z",
    "updatedAt": "2024-08-24T17:39:53.022Z"
  }
}

```
_Response (400 - Bad Request)_
```
{
    "message": "<validation error message>"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

### GET /products
>get all products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
[
  {
    "id": "<product_id>",
    "name": "<product_name>",
    "description": "<product_description>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "imgUrl": "<product_imgUrl>",
    "categoryId": "<product_categoryId>",
    "authorId": "<author_id>",
    "createdAt": "2024-08-22T13:45:12.896Z",
    "updatedAt": "2024-08-22T13:45:12.896Z",
    "User": {
            "id": <user_id>,
            "username": "<user_username>",
            "email": "<user_email>",
            "role": "<user_role>",
            "phoneNumber": "<user_phoneNumber>",
            "address": "<user_address>",
            "createdAt": "2024-08-22T13:45:12.652Z",
            "updatedAt": "2024-08-22T13:45:12.652Z"
        }
  }
]
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```



### GET /products/:id
>get product with specified id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
product id
```
_Response (200 - Success)_
```
  {
    "id": "<product_id>",
    "name": "<product_name>",
    "description": "<product_description>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "imgUrl": "<product_imgUrl>",
    "categoryId": "<product_categoryId>",
    "authorId": "<author_id>",
    "createdAt": "2024-08-22T13:45:12.896Z",
    "updatedAt": "2024-08-22T13:45:12.896Z"
  }
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (404 - Not Found)_
```
    {
    "message": "Data is not Found"
}
```

### POST /products
>add new product (viable for staff and admin)

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product_name>",
  "description": "<product_description>",
  "price": "<product_price>",
  "stock": "<product_stock>",
  "imgUrl": "<product_imgUrl>",
  "categoryId": "<product_categoryId>"
}

```

_Response (201 - Created)_
```
{
  "message": "Success creating new Product!",
  "product": {
    "id": "<product_id>",
    "name": "<product_name>",
    "description": "<product_description>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "imgUrl": "<product_imgUrl>",
    "categoryId": "<product_categoryId>",
    "authorId": "<author_id>"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

### PUT /products/:id
>edit product(staff only able to edit if the product is thers)

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
product id
```

_Request Body_
```
{
  "name": "<product_name>",
  "description": "<product_description>",
  "price": "<product_price>",
  "stock": "<product_stock>",
  "imgUrl": "<product_imgUrl>",
  "categoryId": "<product_categoryId>"
}

```

_Response (200 - Success)_
```
{
  "id": "<product_id>",
  "name": "<product_name>",
  "description": "<product_description>",
  "price": "<product_price>",
  "stock": "<product_stock>",
  "imgUrl": "<product_imgUrl>",
  "categoryId": "<product_categoryId>",
  "authorId": "<author_id>"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (404 - Not Found)_
```
    {
    "message": "Data is not Found"
}
```

### DELETE /products/:id
>delete product with specified id(staff only able to delete if the product is theirs)

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
product id
```

_Response (200 - Success)_
```
{
  "message" : "success delete",
  "data" : {
    "id": "<product_id>",
    "name": "<product_name>",
    "description": "<product_description>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "imgUrl": "<product_imgUrl>",
    "categoryId": "<product_categoryId>",
    "authorId": "<author_id>",
    "createdAt": "2024-08-22T13:45:12.896Z",
    "updatedAt": "2024-08-22T13:45:12.896Z"
  }
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (404 - Not Found)_
```
    {
    "message": "Data is not Found"
}
```

### GET /categories
>get all categories
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
{
    "message": "Success get all Category",
    "data": [
        {
            "id": <category_id>,
            "name": "<category_name>",
            "createdAt": "2024-08-24T17:39:53.022Z",
            "updatedAt": "2024-08-24T17:39:53.022Z"
        },
        ...
    ]
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

### POST /categories
>Adding new categoy
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "<category_name>"
}
```

_Response (201 - Created)_
```
{
    "message": "Success creating new Category",
    "data": {
        "id": <category_id>,
        "name": "<category_name>",
        "createdAt": "2024-08-24T17:39:53.022Z",
        "updatedAt": "2024-08-24T17:39:53.022Z"
    }
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```

### PUT /categories/:id
>Editing category with specified id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
category id
```
_Request Body
```
{
    "name": "<category_name>"
}
```

_Response (200 - Success)_
```
{
    "message": "Success edit Category with id of <category_id>",
    "data": {
        "id": <category_id>,
        "name": "<updated_category_name>",
        "createdAt": "2024-08-24T17:39:53.022Z",
        "updatedAt": "2024-08-24T17:40:53.022Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data is not Found"
}
```

### DELETE /categories/:id
>deleteing category with specified id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    category id
}
```

_Response (200 - Success)_
```
{
    "message": "Success delete",
    "data": {
        "id": <category_id>,
        "name": "<category_name>",
        "createdAt": "2024-08-24T17:39:53.022Z",
        "updatedAt": "2024-08-24T17:39:53.022Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You don't have the permission"
}
```

_Response (404 - Not Found)_
```
    {
    "message": "Data is not Found"
}
```






# Error Handling
## Common Error Response
### 401 Unauthorized
>Invalid Authorization Token

### 403 Forbidden
>The user doesn't have the necessary permission

### 404 Not Found
>The requested data is not exist

### 500 Internal Server Error
>Unexpected Error from the server








