namespace SolutionTemplate2.BackEnd.Infrastructure.Endpoint;

public interface IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app);
}
