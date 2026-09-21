using SolutionTemplate2.BackEnd.Logics.Modules.Main.Users.ReloadMyUser;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users.ReloadMyUser;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Main.Users.ReloadMyUser;

public sealed class ReloadMyUserEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPatch(ReloadMyUserRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(ReloadMyUserRoute.Name)
            .WithDescription(ReloadMyUserRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        ReloadMyUserCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
