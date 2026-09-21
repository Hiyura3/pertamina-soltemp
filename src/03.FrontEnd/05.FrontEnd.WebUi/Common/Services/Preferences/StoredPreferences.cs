namespace SolutionTemplate2.FrontEnd.WebUi.Common.Services.Preferences;

public sealed record StoredPreferences
{
    public const string Key = $"{nameof(SolutionTemplate2)}.{nameof(StoredPreferences)}";

    public bool IsDarkMode { get; set; }
}
