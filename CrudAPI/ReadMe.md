# API Information
---
## How to Run
1. **Clone the repository**:
  ```
  git clone <repository-url>
  cd <repository-folder>
  ```
2. **Run MongoDB**:
  ```
mongod
```
3. **Install dependencies**:
  ```
  npm install
  ```
4. **Start the application**:
  ```
  nodemon run start
  ```
5. **Test the API**: Use Postman or your preferred tool to test the endpoints listed below.

--- 
## 1. User Management API
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

## 2. Survey Management API
This API allows you to manage survey data, including creating surveys, retrieving all surveys, updating existing surveys, deleting surveys, and saving survey answers.

### Base URL
```
http://localhost:9000/surveys
```
---
### Endpoints
### 1. Get All Surveys
#### Endpoint:
`GET /surveys`

**Description**:
Fetch all surveys from the database.

**Response**:
```
Status: 200 OK
[
  {
    "_id": "615aef425a7a8906c0e5b789",
    "nameofsurvey": "Health Assessment",
    "assignedPatients": ["John Doe", "Jane Doe"],
    "questions": [
      { "questiontype": "Multiple Choice", "questiontext": "How are you feeling today?" },
      { "questiontype": "Text", "questiontext": "Describe any symptoms." }
    ],
    "createdBy": "Dr. Smith",
    "__v": 0
  }
]

```
**Error Response** :

```
Status: 500 Internal Server Error
{
  "message": "Server error",
  "error": "Detailed error message here"
}
```
---
### 2. Create a New Survey
### Endpoint:
`POST /surveys`

**Description**:
Create a new survey.

**Request Body**:
```
{
  "nameofsurvey": "Health Assessment",
  "assignedPatients": ["John Doe", "Jane Doe"],
  "questions": [
    { "questiontype": "Multiple Choice", "questiontext": "How are you feeling today?" },
    { "questiontype": "Text", "questiontext": "Describe any symptoms." }
  ],
  "createdBy": "Dr. Smith"
}
```

**Response**:

```
Status: 201 Created
{
  "message": "Survey created successfully",
  "survey": {
    "_id": "615aef425a7a8906c0e5b789",
    "nameofsurvey": "Health Assessment",
    "assignedPatients": ["John Doe", "Jane Doe"],
    "questions": [
      { "questiontype": "Multiple Choice", "questiontext": "How are you feeling today?" },
      { "questiontype": "Text", "questiontext": "Describe any symptoms." }
    ],
    "createdBy": "Dr. Smith",
    "__v": 0
  }
}

```
**Error Response**:
```
Status: 500 Internal Server Error
{
  "message": "Error creating survey",
  "error": "Detailed error message here"
}

```
---
### 3. Update a Survey by ID

**Endpoint**:
`PATCH /surveys/:id`

**Description**:
Update an existing survey by its ID.

**Parameters**:

`:id` (required) - The ID of the survey.

**Request Body (optional fields):**
```
{
  "nameofsurvey": "Updated Health Assessment",
  "assignedPatients": ["John Doe", "Jane Doe", "Jim Doe"],
  "questions": [
    { "questiontype": "Multiple Choice", "questiontext": "How are you feeling now?" }
  ],
  "createdBy": "Dr. Smith"
}

```
**Response**:
```
Status: 200 OK
{
  "message": "Survey updated successfully",
  "survey": {
    "_id": "615aef425a7a8906c0e5b789",
    "nameofsurvey": "Updated Health Assessment",
    "assignedPatients": ["John Doe", "Jane Doe", "Jim Doe"],
    "questions": [
      { "questiontype": "Multiple Choice", "questiontext": "How are you feeling now?" }
    ],
    "createdBy": "Dr. Smith",
    "__v": 0
  }
}
```
**Error Response**:
```
Status: 404 Not Found
{
  "message": "Survey not found"
}
```
---
### 4. Delete a Survey
#### Endpoint:
`DELETE /surveys/:id`

**Description**:
Delete a survey by its ID.

**Parameters**:

`:id` (required) - The ID of the survey.
**Response**:
```
Status: 200 OK
{
  "message": "Survey deleted successfully"
}
```
**Error Response**:
```
Status: 404 Not Found
{
  "message": "Survey not found"
}

```
---
### 5. Save Survey Answers
**Endpoint**:
`POST /surveys/:id/answers`

**Description**:
Save the answers for a particular survey by its ID.

**Parameters**:

`:id `(required) - The ID of the survey.
**Request Body**:
```
Status: 200 OK
{
  "message": "Answers saved successfully",
  "survey": {
    "_id": "615aef425a7a8906c0e5b789",
    "nameofsurvey": "Health Assessment",
    "responses": [
      {
        "patientName": "John Doe",
        "answers": [
          { "questionId": "615aef425a7a8906c0e5b790", "answer": "I feel good." },
          { "questionId": "615aef425a7a8906c0e5b791", "answer": "No symptoms." }
        ]
      }
    ]
  }
}

```
**Response**:
```
Status: 200 OK
{
  "message": "Answers saved successfully",
  "survey": {
    "_id": "615aef425a7a8906c0e5b789",
    "nameofsurvey": "Health Assessment",
    "responses": [
      {
        "patientName": "John Doe",
        "answers": [
          { "questionId": "615aef425a7a8906c0e5b790", "answer": "I feel good." },
          { "questionId": "615aef425a7a8906c0e5b791", "answer": "No symptoms." }
        ]
      }
    ]
  }
}
```
**Error Response**:
```
Status: 500 Internal Server Error
{
  "message": "Error saving answers",
  "error": "Detailed error message here"
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
