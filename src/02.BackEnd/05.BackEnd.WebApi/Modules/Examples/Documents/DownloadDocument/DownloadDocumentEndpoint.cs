using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Documents.DownloadDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.DownloadDocument;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Documents.DownloadDocument;

public sealed class DownloadDocumentEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(DownloadDocumentRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(DownloadDocumentRoute.Name)
            .WithDescription(DownloadDocumentRoute.Description)
            .Produces<DownloadDocumentResponse>();
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid documentId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new DownloadDocumentQuery
        {
            DocumentId = documentId
        };

        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
