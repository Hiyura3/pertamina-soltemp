using SolutionTemplate2.BackEnd.Logics.Modules.Administration.Configurations.GetConfiguration;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Configurations;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Configurations.GetConfiguration;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Administration.Configurations.GetConfiguration;

public sealed class GetConfigurationEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetConfigurationRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(GetConfigurationRoute.Name)
            .WithDescription(GetConfigurationRoute.Description)
            .Produces<GetConfigurationResponse>();
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid configurationId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetConfigurationQuery
        {
            ConfigurationId = configurationId
        };

        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
