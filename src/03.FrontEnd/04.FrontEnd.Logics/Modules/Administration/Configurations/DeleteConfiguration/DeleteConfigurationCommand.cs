using SolutionTemplate2.Shared.Dto.Modules.Administration.Configurations.DeleteConfiguration;

namespace SolutionTemplate2.FrontEnd.Logics.Modules.Administration.Configurations.DeleteConfiguration;

public sealed record DeleteConfigurationCommand : DeleteConfigurationRequest, IRequest
{
}

public sealed class DeleteConfigurationCommandValidator : AbstractValidatorBase<DeleteConfigurationCommand>
{
    public DeleteConfigurationCommandValidator()
    {
        Include(new DeleteConfigurationRequestValidator());
    }
}

public sealed class DeleteConfigurationCommandHandler(IBackEndApiService backEndApiService)
    : IRequestHandler<DeleteConfigurationCommand>
{
    public async Task Handle(DeleteConfigurationCommand request, CancellationToken cancellationToken)
    {
        var restRequest = new RestRequest(DeleteConfigurationRoute.ResourceUri(request.ConfigurationId), Method.Delete);

        await backEndApiService.SendRequestAsync(restRequest, cancellationToken);
    }
}
