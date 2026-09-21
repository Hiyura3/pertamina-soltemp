using SolutionTemplate2.BackEnd.Infrastructure.Authentication;
using SolutionTemplate2.BackEnd.Infrastructure.BackgroundJob;
using SolutionTemplate2.BackEnd.Infrastructure.Cryptography;
using SolutionTemplate2.BackEnd.Infrastructure.CurrentUser;
using SolutionTemplate2.BackEnd.Infrastructure.Database;
using SolutionTemplate2.BackEnd.Infrastructure.DateAndTime;
using SolutionTemplate2.BackEnd.Infrastructure.Email;
using SolutionTemplate2.BackEnd.Infrastructure.Endpoint;
using SolutionTemplate2.BackEnd.Infrastructure.ExceptionHandler;
using SolutionTemplate2.BackEnd.Infrastructure.FileStorage;
using SolutionTemplate2.BackEnd.Infrastructure.HealthCheck;
using SolutionTemplate2.BackEnd.Infrastructure.IdAMan;
using SolutionTemplate2.BackEnd.Infrastructure.Logging;
using SolutionTemplate2.BackEnd.Infrastructure.Monitoring;
using SolutionTemplate2.BackEnd.Infrastructure.Otp;
using SolutionTemplate2.BackEnd.Infrastructure.PublicHolidays;
using SolutionTemplate2.BackEnd.Infrastructure.Secret;
using SolutionTemplate2.BackEnd.Services.AppConfigBackEnd;

namespace SolutionTemplate2.BackEnd.Infrastructure;

public static class ConfigureInfrastructure
{
    public static void AddInfrastructure(this WebApplicationBuilder builder, AppConfigBackEndOptions appConfigBackEndOptions, Dictionary<string, string> secrets)
    {
        var applicationInsightsConnectionString = secrets[SecretKeyFor.ConnectionStringsApplicationInsights];
        var applicationDatabaseConnectionString = secrets[SecretKeyFor.ConnectionStringsApplicationDatabase];
        var servicesDatabaseConnectionString = secrets[SecretKeyFor.ConnectionStringsServicesDatabase];
        var cryptographyKey = secrets[SecretKeyFor.CryptographyKey];
        var cryptographyTweak = secrets[SecretKeyFor.CryptographyTweak];
        var smtpUsername = secrets[SecretKeyFor.EmailSmtpUsername];
        var smtpPassword = secrets[SecretKeyFor.EmailSmtpKataKunci];

        _ = builder.Host.AddLoggingService(applicationInsightsConnectionString);

        var healthChecksBuilder = builder.Services.AddHealthCheckService(builder.Configuration, appConfigBackEndOptions.PathBase, appConfigBackEndOptions.AppNickName, servicesDatabaseConnectionString);

        _ = builder.Services.AddHttpClient();
        _ = builder.Services.AddHttpContextAccessor();
        _ = builder.Services.AddBackgroundJobService(builder.Configuration, servicesDatabaseConnectionString, healthChecksBuilder);
        _ = builder.Services.AddCryptographyService(cryptographyKey, cryptographyTweak);
        _ = builder.Services.AddCurrentUserService();
        _ = builder.Services.AddDatabaseService(applicationDatabaseConnectionString, healthChecksBuilder);
        _ = builder.Services.AddDateAndTimeService();
        _ = builder.Services.AddEmailService(builder.Configuration, smtpUsername, smtpPassword, healthChecksBuilder);
        _ = builder.Services.AddExceptionHandlerService();
        _ = builder.Services.AddFileStorageService(builder.Configuration, healthChecksBuilder);
        _ = builder.Services.AddMonitoringService(appConfigBackEndOptions.AppNickName, applicationInsightsConnectionString);
        _ = builder.Services.AddOtpService(builder.Configuration);
        _ = builder.Services.AddAuthorization();
        _ = builder.Services.AddOpenApi(options => _ = options.AddSchemaTransformer(new CustomSchemaTransformer()));

        var idAManClientId = secrets[SecretKeyFor.IdAManClientId];
        var idAManClientSecret = secrets[SecretKeyFor.IdAManClientSecret];
        var idAManObjectId = secrets[SecretKeyFor.IdAManObjectId];
        var idAManOptions = builder.Services.AddIdAManService(builder.Configuration, idAManClientId, idAManClientSecret, idAManObjectId, healthChecksBuilder);
        _ = builder.Services.AddAuthenticationService(idAManOptions);

        _ = builder.Services.AddPublicHolidaysService(builder.Configuration);
    }
}
