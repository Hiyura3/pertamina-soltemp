using SolutionTemplate2.BackEnd.Logics.Modules.Main.Users.CreateMyUser;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users.CreateMyUser;
using SolutionTemplate2.Shared.Dto.Modules.Main.Users.GetMyUser;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Main.Users.CreateMyUser;

public sealed class CreateMyUserEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(CreateMyUserRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(CreateMyUserRoute.Name)
            .WithDescription(CreateMyUserRoute.Description)
            .Produces<CreateMyUserResponse>(StatusCodes.Status201Created);
    }

    private static async Task<IResult> Handle(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateMyUserCommand();
        var response = await sender.Send(command, cancellationToken);

        return Results.Created(GetMyUserRoute.ResourceUri, response);
    }
}
