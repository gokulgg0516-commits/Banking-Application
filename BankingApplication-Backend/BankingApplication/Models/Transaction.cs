using System.ComponentModel.DataAnnotations.Schema;

namespace BankingApplication.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Column("AccountId")]
        public int AccountID { get; set; }
        public string? Type { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
