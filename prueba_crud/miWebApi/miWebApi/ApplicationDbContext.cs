using Microsoft.EntityFrameworkCore;
using miWebApi.Entidades;

namespace miWebApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Laptop> Laptops { get; set; }
    }
}
