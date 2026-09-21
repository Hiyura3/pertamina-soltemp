using Pertamina.Extensions.Polly;
using SolutionTemplate2.FrontEnd.Infrastructure.Emoji.EmojiHub;
using SolutionTemplate2.FrontEnd.Infrastructure.Emoji.EmojisWorld;
using SolutionTemplate2.FrontEnd.Services.Emoji;

namespace SolutionTemplate2.FrontEnd.Infrastructure.Emoji;

public static class ConfigureEmoji
{
    private static readonly TimeSpan _handlerLifetime = TimeSpan.FromMinutes(5);
    private static readonly TimeSpan _durationOfBreak = TimeSpan.FromSeconds(30);
    private const int RetryCount = 5;
    private const int AllowedHandledEvents = 5;

    public static IServiceCollection AddEmojiService(this IServiceCollection services, IConfiguration configuration)
    {
        var emojiProvider = configuration[$"{nameof(Emoji)}:Provider"]
            ?? throw new ConfigurationBindingFailedException($"{nameof(Emoji)}:Provider", typeof(string));

        switch (emojiProvider)
        {
            case EmojiProvider.EmojiHub:
                _ = services.Configure<EmojiHubEmojiOptions>(configuration.GetRequiredSection(EmojiHubEmojiOptions.SectionKey));
                _ = services.AddHttpClient<IEmojiService, EmojiHubEmojiService>()
                    .SetDefaultPollyPolicy(_handlerLifetime, RetryCount, AllowedHandledEvents, _durationOfBreak);
                break;
            case EmojiProvider.EmojisWorld:
                _ = services.Configure<EmojisWorldEmojiOptions>(configuration.GetRequiredSection(EmojisWorldEmojiOptions.SectionKey));
                _ = services.AddHttpClient<IEmojiService, EmojisWorldEmojiService>()
                    .SetDefaultPollyPolicy(_handlerLifetime, RetryCount, AllowedHandledEvents, _durationOfBreak);
                break;
            default:
                throw new UnsupportedServiceProviderException(nameof(Emoji), emojiProvider);
        }

        return services;
    }
}
