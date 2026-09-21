using SolutionTemplate2.BackEnd.Logics.Modules.Administration.Audits.GetAudits;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Audits;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Audits.GetAudits;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Administration.Audits.GetAudits;

public sealed class GetAuditsEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetAuditsRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(GetAuditsRoute.Name)
            .WithDescription(GetAuditsRoute.Description)
            .Produces<GetAuditsResponse>();
    }

    private static async Task<IResult> Handle(
        ISender sender,
        [AsParameters] GetAuditsQuery query,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
