using BankingApplication.Data;
using Microsoft.AspNetCore.Mvc;
using BankingApplication.Models;
using Microsoft.Identity.Client;

namespace BankingApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BankController : Controller
    {
        public readonly BankDbContext context;

        public BankController(BankDbContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public IActionResult Getbalance(int id)
        {
            var account= context.Bankdata.Find(id);
            if(account == null)
            {
                return NotFound(new { message = "Account not found"});
                    
            }
            return Ok(account);
        }

        [HttpPost("{id}/deposit")]
        public IActionResult Deposited(int id,decimal amount)
        {
            if (amount <= 0)
            {
                return BadRequest(new {message ="Amount must be greater that Zero !"});
            }
            var Bankdata = context.Bankdata.Find(id);
            if (Bankdata == null)
            {
                return NotFound(new { message = "Account not found" });
            }
            Bankdata.Balance += amount;
               

            var transaction = new Models.Transaction
            {
                AccountID = id, 
                Type = "Deposited",
                Amount = amount,
                Date = DateTime.Now
            };
            context.Transactions.Add(transaction);

            context.SaveChanges();
            return Ok(Bankdata.Balance);
        }

        [HttpPost("{id}/withdraw")]
        public IActionResult Withdraw(int id,decimal amount)
        {
            if (amount <= 0)
            {
                return BadRequest(new { message = "Amount must be greater that Zero !" });
            }
            var Bankdata = context.Bankdata.Find(id);
            if (Bankdata == null)
            {
                return NotFound(new { message = "Account not found" });
            }

            if (amount > Bankdata.Balance)
            {
                return BadRequest(new { message = $"Insufficient balance! your current balance ₹{Bankdata.Balance}, requested amount ₹{amount}" });
            }
            else
            {
                Bankdata.Balance -= amount;
            }

            var transaction = new Models.Transaction
            {
                AccountID = id,
                Type = "Withdrawn",
                Amount = amount,
                Date = DateTime.Now
            };
            context.Transactions.Add(transaction);

            context.SaveChanges();
            return Ok(Bankdata.Balance);
        }

        [HttpGet("{id}/transactions")]
        public IActionResult GetTransactions(int id)
        {
            var transactions = context.Transactions.Where(t => t.AccountID == id).ToList();
            return Ok(transactions);
        }

        [HttpPost("create")]
        public IActionResult Createaccount(string name)
        {
            var account = new Bankdata
            {
                Name = name,
                Balance = 0
            };
            context.Bankdata.Add(account);
            context.SaveChanges();
            return Ok(account);
        
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var transaction = context.Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction == null)
            {
                return NotFound(new { message = "Transaction not found" });
            }
            context.Transactions.Remove(transaction);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet("accounts")]
        public IActionResult GetAccounts()
        {
            var accounts = context.Bankdata.ToList();
            return Ok(accounts);
        }
    }
}
