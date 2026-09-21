using Microsoft.EntityFrameworkCore;
using SolutionTemplate2.BackEnd.Domain.Entities;

namespace SolutionTemplate2.BackEnd.Services.Database;

public partial interface IDatabaseService
{
    public DbSet<ApiCall> ApiCalls { get; }
    public DbSet<Audit> Audits { get; }
    public DbSet<Configuration> Configurations { get; }
    public DbSet<Country> Countries { get; }
    public DbSet<Document> Documents { get; }
    public DbSet<PublicHoliday> PublicHolidays { get; }
    public DbSet<User> Users { get; }
}
