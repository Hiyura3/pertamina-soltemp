using SolutionTemplate2.BackEnd.Logics.Modules.Main.Users.GetMyUser;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users.GetMyUser;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Main.Users.GetMyUser;

public sealed class GetMyUserEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetMyUserRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(GetMyUserRoute.Name)
            .WithDescription(GetMyUserRoute.Description)
            .Produces<GetMyUserResponse>();
    }

    private static async Task<IResult> Handle(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetMyUserQuery();
        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
