## API Information

### User Management API
This API allows you to manage user data, including retrieving users, adding new users, updating users, and deleting users.

### Base URL
```
http://localhost:3000/users
```
---
### Endpoints
### 1. Get All Users
#### Endpoint:
`GET /users`

**Description**:
Fetch all users from the database.

**Response**:
```
Status: 200 OK
[
  {
    "_id": "615aef425a7a8906c0e5b123",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password_here",
    "profession": "Doctor",
    "__v": 0
  },
  {
    "_id": "615aef425a7a8906c0e5b124",
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "password_here",
    "profession": "Patient",
    "__v": 0
  }
]

```
---
### 2. Get User by ID
#### Endpoint:
`GET /users/:id`

**Description:**
Fetch a specific user by their ID.

**Parameters:**

`:id` (required) - The ID of the user.

**Response:**

```
Status: 200 OK
{
  "_id": "615aef425a7a8906c0e5b123",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password_here",
  "profession": "Doctor",
  "__v": 0
}

```
**Error Response:**
```
Status: 404 Not Found
{
  "message": "User not found"
}

```
---
### 3. Create a New User
#### Endpoint:
`POST /users`

**Description**:
Create a new user.

**Request Body**:
```
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password_here",
  "profession": "Doctor"
}
```
**Response**:
```
Status: 201 Created
{
  "message": "User created successfully",
  "data": {
    "_id": "615aef425a7a8906c0e5b125",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password_here",
    "profession": "Doctor",
    "__v": 0
  }
}
```
**Error Response**:

```
Status: 400 Bad Request
{
  "message": "Full name, email, password, and profession are required."
}

```
---
### 4. Update a User
#### Endpoint:
`PATCH users/:id`

**Description**:
Update the details of an existing user.

**Parameters**:

`:id`(required) - The ID of the user.
**Request Body (optional fields)**:
```
{
  "fullName": "Updated Name",
  "email": "updated.email@example.com",
  "password": "new_password_here",
  "profession": "Updated Profession"
}

```
**Response**:
```
Status: 200 OK
{
  "message": "User updated successfully",
  "data": {
    "_id": "615aef425a7a8906c0e5b123",
    "fullName": "Updated Name",
    "email": "updated.email@example.com",
    "password": "new_hashed_password_here",
    "profession": "Updated Profession",
    "__v": 0
  }
}
```
**Error Response**:
```
Status: 404 Not Found
{
  "message": "User not found"
}

```

---
### 5. Delete a User
#### Endpoint:
`DELETE /users/:id`

**Description**:
Delete a user by their ID.

**Parameters**:

`:id` (required) - The ID of the user.
**Response**:
```
Status: 200 OK
{
  "message": "User deleted successfully",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}

```
**Error Response**:
```
Status: 404 Not Found
{
  "message": "User not found"
}

```
---
### Error Handling
If there are any server issues or invalid requests, the API will respond with a 500 status code and an error message:

**Response Example**:
```
Status: 500 Internal Server Error
{
  "message": "Server error",
  "error": "Detailed error message here"
}
```

--- 


