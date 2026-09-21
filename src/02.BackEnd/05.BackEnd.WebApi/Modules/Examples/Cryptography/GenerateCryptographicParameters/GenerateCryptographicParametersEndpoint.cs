using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Cryptography.GenerateCryptographicParameters;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Cryptography;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Cryptography.GenerateCryptographicParameters;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Cryptography.GenerateCryptographicParameters;

public sealed class GenerateCryptographicParametersEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GenerateCryptographicParametersRoute.Pattern, Handle)
            .AllowAnonymous()
            .WithTags(RouteConfig.Tag)
            .WithName(GenerateCryptographicParametersRoute.Name)
            .WithDescription(GenerateCryptographicParametersRoute.Description)
            .Produces<GenerateCryptographicParametersResponse>();
    }

    private static async Task<IResult> Handle(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GenerateCryptographicParametersQuery();
        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
