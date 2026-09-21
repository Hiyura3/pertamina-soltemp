using Pertamina.Services.Cryptography;
using Pertamina.Services.Cryptography.Fpe;

namespace SolutionTemplate2.BackEnd.Infrastructure.Cryptography;

public static class ConfigureCryptography
{
    public static IServiceCollection AddCryptographyService(this IServiceCollection services, string key, string tweak)
    {
        _ = services.AddSingleton<ICryptographyService, FpeCryptographyService>(sp => new FpeCryptographyService(key, tweak));

        return services;
    }
}
