using SolutionTemplate2.BackEnd.Services.PublicHolidays;
using SolutionTemplate2.Shared.Dto.Modules.Examples.PublicHolidays.LoadPublicHolidays;

namespace SolutionTemplate2.BackEnd.Logics.Modules.Examples.PublicHolidays.LoadPublicHolidays;

public sealed record LoadPublicHolidaysCommand : LoadPublicHolidaysRequest, IRequest<LoadPublicHolidaysResponse>
{
}

public sealed class LoadPublicHolidaysCommandValidator : AbstractValidator<LoadPublicHolidaysCommand>
{
    public LoadPublicHolidaysCommandValidator()
    {
        Include(new LoadPublicHolidaysRequestValidator());
    }
}

public sealed class LoadPublicHolidaysCommandHandler(
    IPublicHolidaysService publicHolidayService,
    IDatabaseService databaseService)
    : IRequestHandler<LoadPublicHolidaysCommand, LoadPublicHolidaysResponse>
{
    public async Task<LoadPublicHolidaysResponse> Handle(LoadPublicHolidaysCommand request, CancellationToken cancellationToken)
    {
        var onlinePublicHolidays = await publicHolidayService.GetPublicHolidaysAsync(request.Year, request.CountryCode, cancellationToken);

        var publicHolidays = await databaseService.PublicHolidays
            .Where(x => x.Date.Year == request.Year && x.CountryCode == request.CountryCode)
            .ToListAsync(cancellationToken);

        foreach (var onlinePublicHoliday in onlinePublicHolidays)
        {
            var publicHoliday = publicHolidays
                .SingleOrDefault(x => x.Date == onlinePublicHoliday.Date);

            if (publicHoliday is null)
            {
                publicHoliday = new PublicHoliday
                {
                    Date = onlinePublicHoliday.Date,
                    Name = onlinePublicHoliday.Name,
                    LocalName = onlinePublicHoliday.LocalName,
                    CountryCode = onlinePublicHoliday.CountryCode
                };

                _ = await databaseService.PublicHolidays.AddAsync(publicHoliday, cancellationToken);
            }
            else
            {
                publicHoliday.Name = onlinePublicHoliday.Name;
                publicHoliday.LocalName = onlinePublicHoliday.LocalName;
            }
        }

        _ = await databaseService.SaveAsync(nameof(LoadPublicHolidays), cancellationToken);

        return new LoadPublicHolidaysResponse
        {
            Items = onlinePublicHolidays.Select(x => new PublicHolidayItem
            {
                Date = x.Date,
                Name = x.Name,
                LocalName = x.LocalName,
                CountryCode = x.CountryCode
            })
        };
    }
}
