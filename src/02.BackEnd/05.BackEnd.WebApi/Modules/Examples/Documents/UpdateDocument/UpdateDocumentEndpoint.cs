using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Documents.UpdateDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.UpdateDocument;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Documents.UpdateDocument;

public sealed class UpdateDocumentEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPatch(UpdateDocumentRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(UpdateDocumentRoute.Name)
            .WithDescription(UpdateDocumentRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid documentId,
        UpdateDocumentCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (documentId != command.DocumentId)
        {
            throw ExceptionFor.Mismatch(nameof(documentId), documentId, nameof(command.DocumentId), command.DocumentId);
        }

        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
