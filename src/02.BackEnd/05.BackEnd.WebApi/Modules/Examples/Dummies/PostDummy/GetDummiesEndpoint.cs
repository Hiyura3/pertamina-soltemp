using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Dummies.PostDummy;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Dummies;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Dummies.PostDummy;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Dummies.PostDummy;

public sealed class PostDummyEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(PostDummyRoute.Pattern, Handle)
            .AllowAnonymous()
            .WithTags(RouteConfig.Tag)
            .WithName(PostDummyRoute.Name)
            .WithDescription(PostDummyRoute.Description)
            .Produces<PostDummyResponse>();
    }

    private static async Task<IResult> Handle(
        PostDummyCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(command, cancellationToken);

        return Results.Ok(response);
    }
}
