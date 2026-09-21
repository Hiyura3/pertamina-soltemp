using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Documents.AddDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.AddDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.GetDocument;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Documents.AddDocument;

public sealed class AddDocumentEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(AddDocumentRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(AddDocumentRoute.Name)
            .WithDescription(AddDocumentRoute.Description)
            .Produces<AddDocumentResponse>(StatusCodes.Status201Created);
    }

    private static async Task<IResult> Handle(
        [FromForm] string description,
        IFormFile file,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new AddDocumentCommand
        {
            Description = description,
            File = new FileItem
            {
                FileContent = await file.ToBytesAsync(cancellationToken),
                FileName = file.FileName,
                ContentType = file.ContentType
            }
        };

        var response = await sender.Send(command, cancellationToken);

        return Results.Created(GetDocumentRoute.ResourceUri(response.Item.Id), response);
    }
}
