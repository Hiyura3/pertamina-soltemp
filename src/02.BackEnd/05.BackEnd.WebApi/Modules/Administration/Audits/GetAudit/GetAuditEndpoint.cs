
using SolutionTemplate2.BackEnd.Logics.Modules.Administration.Audits.GetAudit;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Audits;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Audits.GetAudit;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Administration.Audits.GetAudit;

public sealed class GetAuditEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetAuditRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(GetAuditRoute.Name)
            .WithDescription(GetAuditRoute.Description)
            .Produces<GetAuditResponse>();
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid auditId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetAuditQuery
        {
            AuditId = auditId
        };

        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
