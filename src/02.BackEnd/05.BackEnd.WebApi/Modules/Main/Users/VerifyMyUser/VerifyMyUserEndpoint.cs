using SolutionTemplate2.BackEnd.Logics.Modules.Main.Users.VerifyMyUser;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users.VerifyMyUser;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Main.Users.VerifyMyUser;

public sealed class VerifyMyUserEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPatch(VerifyMyUserRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(VerifyMyUserRoute.Name)
            .WithDescription(VerifyMyUserRoute.Description)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        VerifyMyUserCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(command, cancellationToken);

        return Results.NoContent();
    }
}
