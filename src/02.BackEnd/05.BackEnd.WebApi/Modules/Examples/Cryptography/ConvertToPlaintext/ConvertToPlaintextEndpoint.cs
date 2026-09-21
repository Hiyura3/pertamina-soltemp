using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Cryptography.ConvertToPlaintext;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Cryptography;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Cryptography.ConvertToPlaintext;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Cryptography.ConvertToPlaintext;

public sealed class ConvertToPlaintextEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(ConvertToPlaintextRoute.Pattern, Handle)
            .AllowAnonymous()
            .WithTags(RouteConfig.Tag)
            .WithName(ConvertToPlaintextRoute.Name)
            .WithDescription(ConvertToPlaintextRoute.Description)
            .Produces<ConvertToPlaintextResponse>();
    }

    private static IResult Handle(
        ConvertToPlaintextCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var response = sender.Send(command, cancellationToken);

        return Results.Ok(response);
    }
}
