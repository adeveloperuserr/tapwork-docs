# API Documentation

## Overview

This document provides an overview of the API endpoints available in the TAPWORK project. Each endpoint is described with its purpose, request parameters, and response format.

## Base URL

The base URL for all API endpoints is:

```
https://api.tapwork.com/v1
```

## Endpoints

### 1. Get User Information

- **Endpoint:** `/users/{id}`
- **Method:** `GET`
- **Description:** Retrieves information about a specific user by their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the user.
- **Response:**
  - **200 OK**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "createdAt": "string"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "User not found"
    }
    ```

### 2. Create a New User

- **Endpoint:** `/users`
- **Method:** `POST`
- **Description:** Creates a new user in the system.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "createdAt": "string"
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "error": "Invalid input"
    }
    ```

### 3. Update User Information

- **Endpoint:** `/users/{id}`
- **Method:** `PUT`
- **Description:** Updates the information of an existing user.
- **Parameters:**
  - `id` (string): The unique identifier of the user.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "updatedAt": "string"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "User not found"
    }
    ```

### 4. Delete a User

- **Endpoint:** `/users/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a user from the system.
- **Parameters:**
  - `id` (string): The unique identifier of the user.
- **Response:**
  - **204 No Content**
  - **404 Not Found**
    ```json
    {
      "error": "User not found"
    }
    ```

## Conclusion

This API documentation provides a basic overview of the available endpoints for user management in the TAPWORK project. For further details, please refer to the specific endpoint documentation or contact the development team.