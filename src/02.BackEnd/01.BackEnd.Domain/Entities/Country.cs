namespace SolutionTemplate2.BackEnd.Domain.Entities;

public sealed class Country : ModifiableEntity
{
    public required string Name { get; set; }
    public required string Code { get; set; }
}
