using SolutionTemplate2.BackEnd.Logics.Modules.MasterData.Countries.DeleteCountry;
using SolutionTemplate2.Shared.Dto.Modules.MasterData.Countries;
using SolutionTemplate2.Shared.Dto.Modules.MasterData.Countries.DeleteCountry;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.MasterData.Countries.DeleteCountry;

public sealed class DeleteCountryEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapDelete(DeleteCountryRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(DeleteCountryRoute.Name)
            .WithDescription(DeleteCountryRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid countryId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new DeleteCountryCommand
        {
            CountryId = countryId
        };

        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
