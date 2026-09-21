using Pertamina.Services.DateAndTime;
using Pertamina.Services.DateAndTime.System;

namespace SolutionTemplate2.BackEnd.Infrastructure.DateAndTime;

public static class ConfigureDateAndTime
{
    public static IServiceCollection AddDateAndTimeService(this IServiceCollection services)
    {
        _ = services.AddSingleton<IDateAndTimeService, SystemDateAndTimeService>();

        return services;
    }
}
