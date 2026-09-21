using SolutionTemplate2.BackEnd.Services.PublicHolidays;

namespace SolutionTemplate2.BackEnd.Infrastructure.PublicHolidays;

public static class ConfigurePublicHolidays
{
    public static IServiceCollection AddPublicHolidaysService(this IServiceCollection services, IConfiguration configuration)
    {
        _ = services.Configure<PublicHolidaysOptions>(configuration.GetRequiredSection(PublicHolidaysOptions.SectionKey));
        _ = services.AddScoped<IPublicHolidaysService, PublicHolidaysService>();

        return services;
    }
}
