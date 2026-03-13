using Microsoft.EntityFrameworkCore;
using BankingApplication.Models;

namespace BankingApplication.Data
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
        {
        }
        public DbSet<Bankdata> Bankdata { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
