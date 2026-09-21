using SolutionTemplate2.FrontEnd.Infrastructure.Authentication;
using SolutionTemplate2.FrontEnd.Infrastructure.Authorization;
using SolutionTemplate2.FrontEnd.Infrastructure.BackEndApi;
using SolutionTemplate2.FrontEnd.Infrastructure.CurrentUser;
using SolutionTemplate2.FrontEnd.Infrastructure.DateAndTime;
using SolutionTemplate2.FrontEnd.Infrastructure.Emoji;
using SolutionTemplate2.FrontEnd.Infrastructure.IdAMan;
using SolutionTemplate2.FrontEnd.Infrastructure.Logging;
using SolutionTemplate2.FrontEnd.Infrastructure.Monitoring;
using SolutionTemplate2.FrontEnd.Infrastructure.Secret;
using SolutionTemplate2.FrontEnd.Services.AppConfigFrontEnd;

namespace SolutionTemplate2.FrontEnd.Infrastructure;

public static class ConfigureInfrastructure
{
    public static void AddInfrastructure(this WebApplicationBuilder builder, AppConfigFrontEndOptions appConfigFrontEndOptions, Dictionary<string, string> secrets)
    {
        var applicationInsightsConnectionString = secrets[SecretKeyFor.ConnectionStringsApplicationInsights];

        _ = builder.Host.AddLoggingService(applicationInsightsConnectionString);

        _ = builder.Services.AddHttpClient();
        _ = builder.Services.AddHttpContextAccessor();
        _ = builder.Services.AddMemoryCache();
        _ = builder.Services.AddAuthorizationService();
        _ = builder.Services.AddCurrentUserService();
        _ = builder.Services.AddDateAndTimeService();
        _ = builder.Services.AddMonitoringService(appConfigFrontEndOptions.AppNickName, applicationInsightsConnectionString);
        _ = builder.Services.AddBackEndApiService(appConfigFrontEndOptions.BackEndApiBaseUrl);

        var idAManClientId = secrets[SecretKeyFor.IdAManClientId];
        var idAManClientSecret = secrets[SecretKeyFor.IdAManClientSecret];
        var idAManObjectId = secrets[SecretKeyFor.IdAManObjectId];
        var idAManOptions = builder.Services.AddIdAManService(builder.Configuration, idAManClientId, idAManClientSecret, idAManObjectId);
        _ = builder.Services.AddAuthenticationService(idAManOptions);

        _ = builder.Services.AddEmojiService(builder.Configuration);
    }
}
