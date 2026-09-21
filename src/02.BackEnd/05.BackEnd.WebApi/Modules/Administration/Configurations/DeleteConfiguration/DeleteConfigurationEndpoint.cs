using SolutionTemplate2.BackEnd.Logics.Modules.Administration.Configurations.DeleteConfiguration;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Configurations;
using SolutionTemplate2.Shared.Dto.Modules.Administration.Configurations.DeleteConfiguration;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Administration.Configurations.DeleteConfiguration;

public sealed class DeleteConfigurationEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapDelete(DeleteConfigurationRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(DeleteConfigurationRoute.Name)
            .WithDescription(DeleteConfigurationRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid configurationId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new DeleteConfigurationCommand
        {
            ConfigurationId = configurationId
        };

        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
