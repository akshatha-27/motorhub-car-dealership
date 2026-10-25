# TEST REPORT
## MotorHub – Car Dealership Inventory System

### 1. Introduction

This report documents the Test-Driven Development (TDD) process followed during the development of the MotorHub Car Dealership Inventory System. It includes the raw test execution results obtained using Jest and Supertest, the failures encountered during implementation, and the subsequent successful test runs.

**Testing tools:** Jest, Supertest  
**Backend:** Node.js and Express.js  
**Database:** MongoDB with Mongoose  
**Command used:** `npm.cmd test`

---

## 2. Raw Test Execution Results

### 2.1 User Registration Test

**Feature:** Create the User Model and Authentication Route

**Initial test execution:**

```text
FAIL tests/auth.test.js

POST /api/auth/register
  × should register a new user successfully

Expected: 201
Received: 404

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

**Observation:** The registration endpoint returned HTTP 404 instead of the expected HTTP 201 because the required functionality was not yet available.

**After implementation:**

```text
PASS tests/auth.test.js

POST /api/auth/register
  √ should register a new user successfully

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

**Result:** PASS

The registration test passed after implementing the user model and authentication route. It verified successful registration, token generation, correct email information, and exclusion of the password from the response.

---

### 2.2 User Login Test

**Feature:** Implement Login with TDD

**Initial test execution:**

```text
FAIL tests/auth.test.js

POST /api/auth/register
  √ should register a new user successfully
  × should log in an existing user successfully

Expected: 200
Received: 404

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 total
```

**Observation:** Registration was working, but the login endpoint returned HTTP 404 instead of HTTP 200.

**After implementation:**

```text
PASS tests/auth.test.js

POST /api/auth/register
  √ should register a new user successfully
  √ should log in an existing user successfully

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

**Result:** PASS

The login test passed after implementing the login functionality. It verified the successful login response, authentication token, and user email.

---

### 2.3 Vehicle Creation Test

**Feature:** Build the Vehicle Inventory Feature

**Initial test execution:**

```text
FAIL tests/vehicles.test.js

POST /api/vehicles
  × should create a vehicle

Expected: 201
Received: 404

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 2 passed, 3 total
```

**Observation:** The vehicle creation endpoint returned HTTP 404 instead of the expected HTTP 201.

**After implementation:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
```

**Result:** PASS

The vehicle creation test passed and verified that a vehicle could be created with the expected make (`Toyota`) and quantity (`5`).

---

### 2.4 Vehicle Listing Test

**Feature:** Add Vehicle Listing and Search

**Initial test execution:**

```text
FAIL tests/vehicles.test.js

GET /api/vehicles
  × should list vehicles for an authenticated user

Expected: 200
Received: 404

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 3 passed, 4 total
```

**Observation:** The vehicle listing endpoint returned HTTP 404 instead of HTTP 200.

**After implementation:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
```

**Result:** PASS

The test passed after implementing vehicle listing. It verified that an authenticated user could retrieve the list of vehicles and that the response was an array.

---

### 2.5 Vehicle Search and Filtering Test

**Feature:** Add Vehicle Search and Filtering

**Initial test execution:**

```text
FAIL tests/vehicles.test.js

GET /api/vehicles search
  × should return only vehicles matching the make

Expected: true
Received: false

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 4 passed, 5 total
```

**Observation:** The search results did not satisfy the expected condition that the returned vehicles match the make `Toyota`.

**After implementation:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```

**Result:** PASS

The search test passed after correcting the search and filtering functionality.

---

### 2.6 Vehicle Purchase Test

**Feature:** Write the Purchase Test

**Initial test execution:**

```text
FAIL tests/vehicles.test.js

POST /api/vehicles/:id/purchase
  × should decrease vehicle quantity by one

Expected: 200
Received: 404

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 5 passed, 6 total
```

**Observation:** The purchase endpoint returned HTTP 404 instead of the expected HTTP 200.

**After implementation:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
```

**Result:** PASS

The purchase test passed after implementing the purchase functionality. It verified that the vehicle quantity decreased by one, from the expected initial quantity of `3` to `2`.

---

### 2.7 Out-of-Stock Vehicle Test

**Feature:** Add a Test for Out-of-Stock Vehicles

**Test execution:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
```

**Observation:** The out-of-stock test passed along with the existing authentication and vehicle tests.

**Result:** PASS

The test suite continued to pass after adding the out-of-stock vehicle test.

---

### 2.8 Admin Authorization and Restocking Test

**Feature:** Admin Authorization and Restocking

**Test execution after adding admin authorization:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
```

**Observation:** Both test suites continued to pass after adding the admin authorization functionality.

**Result:** PASS

---

### 2.9 Vehicle Restocking Test

**Feature:** Add Restocking

**Initial test execution:**

```text
FAIL tests/vehicles.test.js

POST /api/vehicles/:id/restock
  × should increase quantity for an admin

Expected: 200
Received: 404

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 7 passed, 8 total
```

**Observation:** The restocking endpoint returned HTTP 404 instead of the expected HTTP 200.

**After implementation:**

```text
PASS tests/vehicles.test.js
PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
```

**Result:** PASS

The restocking test passed after implementing the restocking functionality. It verified that an administrator could increase the vehicle quantity by the specified amount, from `2` to `5` in the test case.

---

## 3. Final Raw Test Output

The final recorded test execution produced the following output:

```text
PS C:\Users\nayak\car-dealership-inventory\backend> npm.cmd test

> test
> jest --runInBand

PASS tests/vehicles.test.js

PASS tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        5.371 s, estimated 6 s

Ran all test suites.
```

## 4. Test Summary

| Metric | Result |
|---|---:|
| Total test suites | 2 |
| Passed test suites | 2 |
| Failed test suites | 0 |
| Total tests | 8 |
| Passed tests | 8 |
| Failed tests | 0 |
| Snapshots | 0 |
| Execution time | 5.371 seconds |
| Overall status | PASS |

**Test pass rate:**

\[
\frac{8}{8}\times100=100\%
\]

## 5. Conclusion

The MotorHub Car Dealership Inventory System was developed using the Test-Driven Development approach. During implementation, several tests initially failed because the corresponding API endpoints or functionality were not yet implemented correctly. After the required changes were made, the tests passed successfully.

The final recorded execution showed that both test suites passed and all eight tests were successful. The testing process covered user registration, login, vehicle creation, listing, searching and filtering, purchasing, out-of-stock handling, and administrator restocking.

The results demonstrate the successful application of the Red–Green TDD cycle and provide evidence of the tested backend functionality. Further testing can be conducted for additional validation, authorization, and error-handling scenarios.
