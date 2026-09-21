using SolutionTemplate2.FrontEnd.Infrastructure;
using SolutionTemplate2.FrontEnd.Infrastructure.Authentication;
using SolutionTemplate2.FrontEnd.Infrastructure.PathBase;
using SolutionTemplate2.FrontEnd.Infrastructure.Secret;
using SolutionTemplate2.FrontEnd.Logics;
using SolutionTemplate2.FrontEnd.WebUi;

var builder = WebApplication.CreateBuilder(args);
var appConfigFrontEndOptions = builder.GetAppConfigFrontEndOptions();
var secrets = await builder.GetSecretsAsync();
builder.AddInfrastructure(appConfigFrontEndOptions, secrets);
builder.Services.AddLogics(builder.Configuration);
builder.AddWebUi();

var app = builder.Build();
app.UseAndCheckPathBase(appConfigFrontEndOptions.PathBase);
app.UseExceptionHandler($"/{MainRouteFor.Error}", createScopeForErrors: true);
app.UseHsts();
app.UseHttpsRedirection();
app.UseStatusCodePagesWithReExecute("/ErrorWithCode/{0}");
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();
app.MapStaticAssets();
app.MapBlazorHubWithPathBase(appConfigFrontEndOptions.PathBase);
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
app.MapAuthenticationEndpoints(appConfigFrontEndOptions.PathBase);
await app.RunAsync();
