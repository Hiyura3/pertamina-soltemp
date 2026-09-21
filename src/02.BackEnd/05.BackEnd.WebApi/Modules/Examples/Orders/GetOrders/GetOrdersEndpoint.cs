using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Orders.GetOrders;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Orders;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Orders.GetOrders;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Orders.GetOrders;

public sealed class GetOrdersEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapGet(GetOrdersRoute.Pattern, Handle)
            .AllowAnonymous()
            .WithTags(RouteConfig.Tag)
            .WithName(GetOrdersRoute.Name)
            .WithDescription(GetOrdersRoute.Description)
            .Produces<GetOrdersResponse>();
    }

    private static async Task<IResult> Handle(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetOrdersQuery();
        var response = await sender.Send(query, cancellationToken);

        return Results.Ok(response);
    }
}
