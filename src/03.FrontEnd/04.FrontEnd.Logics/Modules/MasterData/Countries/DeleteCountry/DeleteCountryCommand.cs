using SolutionTemplate2.Shared.Dto.Modules.MasterData.Countries.DeleteCountry;

namespace SolutionTemplate2.FrontEnd.Logics.Modules.MasterData.Countries.DeleteCountry;

public sealed record DeleteCountryCommand : DeleteCountryRequest, IRequest
{
}

public sealed class DeleteCountryCommandValidator : AbstractValidatorBase<DeleteCountryCommand>
{
    public DeleteCountryCommandValidator()
    {
        Include(new DeleteCountryRequestValidator());
    }
}

public sealed class DeleteCountryCommandHandler(IBackEndApiService backEndApiService)
    : IRequestHandler<DeleteCountryCommand>
{
    public async Task Handle(DeleteCountryCommand request, CancellationToken cancellationToken)
    {
        var restRequest = new RestRequest(DeleteCountryRoute.ResourceUri(request.CountryId), Method.Delete);

        await backEndApiService.SendRequestAsync(restRequest, cancellationToken);
    }
}
