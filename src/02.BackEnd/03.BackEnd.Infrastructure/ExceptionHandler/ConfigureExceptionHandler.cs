using Pertamina.Extensions.ExceptionHandling;

namespace SolutionTemplate2.BackEnd.Infrastructure.ExceptionHandler;

public static class ConfigureExceptionHandler
{
    public static IServiceCollection AddExceptionHandlerService(this IServiceCollection services)
    {
        _ = services.AddProblemDetails();
        _ = services.AddExceptionHandler<GlobalExceptionHandler>();

        return services;
    }
}
