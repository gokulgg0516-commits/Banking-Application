# Full-Stack Banking Application

A full-stack banking application built with **ASP.NET Core Web API** (Backend) and **React / Next.js** (Frontend), using **Entity Framework Core** with **SQL Server** for data storage.

## Features

- Create multiple bank accounts
- Deposit and withdraw funds with real-time balance updates
- Transaction history per account (Deposit / Withdrawal)
- Delete transactions
- Input validation on both frontend and backend
- Dynamic balance updates using AJAX (Axios)
- Responsive and clean UI

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React, Next.js, Axios, CSS        |
| Backend  | ASP.NET Core Web API, C#          |
| Database | SQL Server, Entity Framework Core |

## Prerequisites

Before running this project, make sure you have the following installed:

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

## Setup Instructions

### 1. Database Setup

Open SQL Server Management Studio and create a new database. Update the connection string in `appsettings.json` in the backend project:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=BankingDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### 2. Backend Setup

Open a terminal in the backend project folder and run:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

The API will start at `https://localhost:7297`.

### 3. Frontend Setup

Open a terminal in the frontend project folder and run:

```bash
npm install
npm run dev
```

The frontend will start at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | /api/Bank/accounts            | Get all accounts             |
| GET    | /api/Bank/{id}                | Get account by ID            |
| POST   | /api/Bank/create?name={name}  | Create a new account         |
| POST   | /api/Bank/{id}/deposit?amount={amount}  | Deposit funds      |
| POST   | /api/Bank/{id}/withdraw?amount={amount} | Withdraw funds     |
| GET    | /api/Bank/{id}/transactions   | Get transactions by account  |
| DELETE | /api/Bank/delete/{id}         | Delete a transaction         |

## Project Structure

```
BankingApplication/
├── Controllers/
│   └── BankController.cs
├── Models/
│   ├── Bankdata.cs
│   └── Transaction.cs
├── Data/
│   └── BankDbContext.cs
├── Program.cs
└── appsettings.json

frontend/
├── app/
│   ├── page.js
│   └── bank.css
├── package.json
└── next.config.js
```

## How to Use

1. Open the app in your browser at `http://localhost:3000`
2. Click **"+ New Account"** to create a bank account
3. Select an account from the **All Accounts** list
4. Enter an amount and click **Deposit** or **Withdraw**
5. View your **Transaction History** below

## Validation Rules

- Amount must be greater than 0
- Amount cannot exceed ₹999999.99
- Withdrawal amount cannot exceed current balance
- Account name is required when creating a new account
