using IDEIMusic.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace IDEIMusic.DAL
{
    public class IDEIMusicContext : DbContext
    {
        public IDEIMusicContext() : base("IDEIMusicContext") { }

        //  Definir as tabelas da base de dados

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        
        public System.Data.Entity.DbSet<IDEIMusic.Models.Album> Albums { get; set; }
        public System.Data.Entity.DbSet<IDEIMusic.Models.Sale> Sale { get; set; }
        public System.Data.Entity.DbSet<IDEIMusic.Models.SaleDetails> SaleDetails { get; set; }
    }
}