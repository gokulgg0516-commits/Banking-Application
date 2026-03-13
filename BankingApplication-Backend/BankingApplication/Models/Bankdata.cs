using System.ComponentModel.DataAnnotations.Schema;

namespace BankingApplication.Models
{
    public class Bankdata
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string? Name { get; set; }
        
        [Column("balance",TypeName= "decimal(10,2)")]
        public decimal Balance { get; set; }
    }
}
