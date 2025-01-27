## setup the project

### nest js

```bash
`npm install`
`cp env-example .env`
Change `<postgres-username>` to `you psotgresql server username`

Change `<postgres-password>` to `you psotgresql server password`
```

### prisma

```bash
`npx prisma migrate dev`

`npx prisma generate`
```

### seeder

```bash
`npm run seeder`
```

## Reference

#### root uri

```http
 http://localhost:5000
```

## auth routes

#### Register new user

```http
  POST /auth/client/register
```

| Body Parameter | Type     | Description                                                                |
| :------------- | :------- | :------------------------------------------------------------------------- |
| `username`     | `string` | **Required** **Unique**                                                    |
| `password`     | `string` | **Required** must contain character, special character, more than 8 leters |
| `role`         | `string` | **Required** choose between "MODERATOR" and "USER"                         |

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `username`     | `string` |
| `role`         | `string` |

---

#### login user

```http
  POST /auth/login
```

| Body Parameter | Type     | Description  |
| :------------- | :------- | :----------- |
| `username`     | `string` | **Required** |
| `password`     | `string` | **Required** |

### Response

| Body Parameter | Type     | Description |
| :------------- | :------- | :---------- |
| `message`      | `string` |
| `access_token` | `string` |

---

#### logout user

```http
  POST /auth/logout
```

| Header Parameter | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token} |

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |

---

#### verify user email

```http
  POST /auth/verifyEmail
```

| Header Parameter | Type     | Description  |
| :--------------- | :------- | :----------- |
| `email`          | `string` | **Required** |

---

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |

#### reset user password

```http
  POST /user/resetPassword/{token}
```

| Header Parameter | Type     | Description  |
| :--------------- | :------- | :----------- |
| `email`          | `string` | **Required** |
| `password`       | `string` | **Required** |

---

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `email`        | `string` |
| `username`     | `string` |

---

## User routes

#### add new user

```http
  POST /user/
```

| Body Parameter | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `username`     | `string` | **Required** **Unique**                            |
| `password`     | `string` | **Required**                                       |
| `role`         | `string` | **Required** choose between "MODERATOR" and "USER" |

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `username`     | `string` |
| `role`         | `string` |

---

#### update user

```http
  PATCH /user/{id}
```

| Body Parameter | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `username`     | `string` | **Optional**                                       |
| `password`     | `string` | **Optional**                                       |
| `role`         | `string` | **Optional** choose between "MODERATOR" and "USER" |

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `username`     | `string` |
| `role`         | `string` |

---

#### get user

```http
  GET /user/{id}
```

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `username`     | `string` |
| `role`         | `string` |

---

#### delete user

```http
  DELETE /user/{id}
```

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `username`     | `string` |
| `email`        | `string` |
| `role`         | `string` |

---

#### add new supplier

```http
  POST /supplier/
```

| Body Parameter          | Type        | Description                                             |
| :---------------------- | :---------- | :------------------------------------------------------ |
| `email`                 | `string`    | **Required** **Unique** must be valid email m@gmail.com |
| `username`              | `string`    | **Required**                                            |
| `address`               | `string`    | **Required**                                            |
| `account_number`        | `Integer`   | **Required**                                            |
| `other_account_numbers` | `Integer[]` | **Optional**                                            |
| `phone_number`          | `string`    | **Required**                                            |

### Response

| Body Parameter          | Type        |
| :---------------------- | :---------- |
| `message`               | `string`    |
| `email`                 | `string`    |
| `username`              | `string`    |
| `address`               | `string`    |
| `account_number`        | `Integer`   |
| `other_account_numbers` | `Integer[]` |
| `phone_number`          | `string`    |
| `supplier_type`         | `string`    |

---

## Product routes

#### add new product

```http
  POST /product/
```

| Body Parameter        | Type     | Description  |
| :-------------------- | :------- | :----------- |
| `product_name`        | `string` | **Required** |
| `product_description` | `string` | **Required** |
| `price`               | `string` | **Required** |
| `stock_quantity`      | `number` | **Required** |

### Response

| Body Parameter        | Type     |
| :-------------------- | :------- |
| `message`             | `string` |
| `product_name`        | `string` |
| `product_description` | `string` |
| `price`               | `number` |
| `stock_quantity`      | `number` |

---

#### update product

```http
  PATCH /product/{id}
```

| Body Parameter        | Type     | Description  |
| :-------------------- | :------- | :----------- |
| `product_name`        | `string` | **Optional** |
| `product_description` | `string` | **Optional** |
| `price`               | `number` | **Optional** |
| `stock_quantity`      | `number` | **Optional** |

### Response

| Body Parameter        | Type     |
| :-------------------- | :------- |
| `message`             | `string` |
| `product_name`        | `string` |
| `product_description` | `string` |
| `price`               | `number` |
| `stock_quantity`      | `number` |

---

#### get product

```http
  GET /product/{id}
```

### Response

| Body Parameter        | Type     |
| :-------------------- | :------- |
| `message`             | `string` |
| `product_name`        | `string` |
| `product_description` | `string` |
| `price`               | `number` |
| `stock_quantity`      | `number` |

---

#### get all products

```http
  GET /product/
```

### Response

| Body Parameter        | Type     |
| :-------------------- | :------- |
| `message`             | `string` |
| `product_name`        | `string` |
| `product_description` | `string` |
| `price`               | `number` |
| `stock_quantity`      | `number` |

---

#### delete product

```http
  DELETE /product/{id}
```

### Response

| Body Parameter        | Type     |
| :-------------------- | :------- |
| `message`             | `string` |
| `product_name`        | `string` |
| `product_description` | `string` |
| `price`               | `number` |
| `stock_quantity`      | `number` |

---

#### delete all products

```http
  DELETE /product/
```

### Response

| Body Parameter | Type     |
| :------------- | :------- |
| `message`      | `string` |
| `count`        | `string` |

---
