using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Documents.GetDocument;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Documents.GetDocument;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Documents.GetDocument;

public sealed class GetDocumentEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetDocumentRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(GetDocumentRoute.Name)
            .WithDescription(GetDocumentRoute.Description)
            .Produces<GetDocumentResponse>();
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid documentId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetDocumentQuery
        {
            DocumentId = documentId
        };

        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
