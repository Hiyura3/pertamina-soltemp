namespace SolutionTemplate2.BackEnd.Domain.Entities;

public sealed class Document : FileEntity
{
    public required string Description { get; set; }
}
