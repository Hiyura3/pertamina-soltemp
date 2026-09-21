using SolutionTemplate2.BackEnd.Logics.Modules.Examples.PublicHolidays.LoadPublicHolidays;
using SolutionTemplate2.Shared.Dto.Modules.Examples.PublicHolidays;
using SolutionTemplate2.Shared.Dto.Modules.Examples.PublicHolidays.LoadPublicHolidays;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.PublicHolidays.LoadPublicHolidays;

public sealed class LoadPublicHolidaysEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(LoadPublicHolidaysRoute.Pattern, Handle)
            .AllowAnonymous()
            .WithTags(RouteConfig.Tag)
            .WithName(LoadPublicHolidaysRoute.Name)
            .WithDescription(LoadPublicHolidaysRoute.Description)
            .Produces<LoadPublicHolidaysResponse>();
    }

    private static async Task<IResult> Handle(
        LoadPublicHolidaysCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(command, cancellationToken);

        return Results.Ok(response);
    }
}
