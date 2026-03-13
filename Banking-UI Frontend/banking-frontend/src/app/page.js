'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bank.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [newName, setNewName]= useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectAccount, setSelectAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if(selectAccount){
    getBalance();
    getTransaction();}
    getAccounts();
  }, [selectAccount]);

  const getBalance = async () => {
    const res = await axios.get(`https://localhost:7297/api/Bank/${selectAccount}`);
    setBalance(res.data.balance);
    setName(res.data.name);
  };

  const getTransaction = async () => {
      const res = await axios.get(`https://localhost:7297/api/Bank/${selectAccount}/transactions`)
      setTransactions(res.data);
    }

  const Deposit = async () => {
    if (amount <= 0) {
      alert("please enter the valid amount");
      return;
    }

    try {
      await axios.post(`https://localhost:7297/api/Bank/${selectAccount}/deposit?amount=${amount}`)
      getBalance();
      getTransaction();
      getAccounts();
      setAmount(0);
    } catch (err) { alert(err.response.data.message) }
  };

  const Withdraw = async () => {
    if (amount <= 0) {
      alert("please enter the valid amount");
      return;
    }

    try {
      await axios.post(`https://localhost:7297/api/Bank/${selectAccount}/withdraw?amount=${amount}`);
      getBalance();
      getTransaction();
      getAccounts();
      setAmount(0);
    } catch (error) {
      alert(error.response.data.message)
    }
  };

const deleteTransaction = async (id) => {
 if(!confirm("Are you sure you want to Delete this transaction?")) return;
  try {
    await axios.delete(`https://localhost:7297/api/Bank/delete/${id}`);
    getBalance();
    getTransaction();
  } catch (err) {
    alert("Failed to delete transaction");
  }
}

const createAccount= async()=>{
  if (!newName){
    alert("please enter your Name!");
    return;
  }
  try{
    await axios.post(`https://localhost:7297/api/Bank/create?name=${newName}`)
    alert("Account created successfully!");
  setShowCreate(false);
  getAccounts();
  }catch(err){
    alert("failed to create account");
  }
};

const getAccounts = async ()=>{
  const res = await axios.get("https://localhost:7297/api/Bank/accounts")
  setAccounts(res.data);
};

  return (
    <div className="container">
      
       <h1>Banking app</h1>
      <p className="subtitle">Digital Banking</p>

<button className="create-btn" onClick={() => setShowCreate(!showCreate)}>
  {showCreate ? "Cancel" : "+ New Account"}
</button>

{showCreate && (
  <div className="card">
    <h2>Create New Account</h2>
     <input type="text" value={newName} placeholder="Enter account holder name" onChange={(e) => setNewName(e.target.value)} />
    <button className="submit-btn" onClick={createAccount}>Create Account</button>
  </div>
)}

<div className="card">
  <h2>All Accounts</h2>
  {accounts.map((a) => (
    <div key={a.id} className={selectAccount == a.id ? "account-item active-account" :"account-item"} onClick={() => {setSelectAccount(a.id);}}>
      <span>{a.name}</span>
      <span style={{ color: "#10b981" }}>₹{a.balance.toFixed(2)}</span>
    </div>
  ))}
</div>

      {selectAccount && 
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="card">
        <h2>Welcome, {name}</h2>  
        <h2 style={{ color: "#10b981" }}>Account Balance: ₹{balance.toFixed(2)}</h2>

        <input type="number" value={amount || ""} placeholder="Enter your Amount" onChange={(e) => { if (e.target.value.length > 10) return; setAmount(Number(e.target.value)) }} />

        <div className="buttons">
          <button onClick={Deposit}>Deposit</button>
          <button onClick={Withdraw}>Withdraw</button>
        </div>
      </div>

      <div className="wide-card">
        <h2>Transaction Histrory</h2>

       <div className="history-container">
        <table>
          
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {transactions.map((t)=>(
              <tr key={t.id}>
                <td>{t.type}</td>
                <td className={t.type === "Deposited" ? "deposit-color" : "withdraw-color"}>{t.type === "Deposited" ? "+" : "-"}₹{t.amount.toFixed(2)}</td>
                <td>{new Date(t.date).toLocaleString()}</td>
                <td>
                  <button className={"delete-icon"} onClick={()=> deleteTransaction(t.id)}>🗑️</button>
                </td>
              </tr>
           ))}        

          </tbody>
        
        </table>
        </div>
      </div>
</div>
}
    </div>
          
 );
}

export default App;