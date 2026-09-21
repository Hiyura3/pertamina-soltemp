namespace SolutionTemplate2.BackEnd.WebApi;

public sealed class FrontEndUiSettings
{
    public const string FileName = "frontend.settings.json";

    public string Ui { get; set; } = "react";
    public string ReactBaseUrl { get; set; } = "https://localhost:44323/soltem2";
    public string BlazorBaseUrl { get; set; } = "https://localhost:44322";

    public string SelectedBaseUrl =>
        string.Equals(Ui, "blazor", StringComparison.OrdinalIgnoreCase) ? BlazorBaseUrl : ReactBaseUrl;

    public static FrontEndUiSettings Load(IHostEnvironment environment)
    {
        var settings = new FrontEndUiSettings();
        foreach (var candidate in CandidatePaths(environment.ContentRootPath))
        {
            if (!File.Exists(candidate))
            {
                continue;
            }

            var json = File.ReadAllText(candidate);
            var parsed = System.Text.Json.JsonSerializer.Deserialize<FrontEndUiSettings>(json, new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (parsed is not null)
            {
                return parsed;
            }
        }

        return settings;
    }

    private static IEnumerable<string> CandidatePaths(string contentRoot)
    {
        yield return Path.Combine(contentRoot, FileName);
        yield return Path.GetFullPath(Path.Combine(contentRoot, "..", "..", "..", "..", FileName));
        yield return Path.GetFullPath(Path.Combine(contentRoot, "..", "..", "..", FileName));
    }
}
