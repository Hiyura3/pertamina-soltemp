using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Documents.DeleteDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.DeleteDocument;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Documents.DeleteDocument;

public sealed class DeleteDocumentEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapDelete(DeleteDocumentRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(DeleteDocumentRoute.Name)
            .WithDescription(DeleteDocumentRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid documentId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new DeleteDocumentCommand
        {
            DocumentId = documentId
        };

        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
