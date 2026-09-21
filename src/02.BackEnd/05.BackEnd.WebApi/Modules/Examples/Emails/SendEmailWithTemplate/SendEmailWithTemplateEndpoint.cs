using SolutionTemplate2.BackEnd.Logics.Modules.Examples.Emails.SendEmailWithTemplate;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Emails;
using SolutionTemplate2.Shared.Dto.Modules.Examples.Emails.SendEmailWithTemplate;

namespace SolutionTemplate2.BackEnd.WebApi.Modules.Examples.Emails.SendEmailWithTemplate;

public sealed class SendEmailWithTemplateEndpoint : IEndpoint
{
    public RouteHandlerBuilder RegisterTo(WebApplication app)
    {
        return app
            .MapPost(SendEmailWithTemplateRoute.Pattern, Handle)
            .RequireAuthorization()
            .WithTags(RouteConfig.Tag)
            .WithName(SendEmailWithTemplateRoute.Name)
            .WithDescription(SendEmailWithTemplateRoute.Description)
            .Produces<SendEmailWithTemplateResponse>();
    }

    private static async Task<IResult> Handle(
        [FromForm] SendEmailWithTemplateCommand request,
        IFormFileCollection? attachments,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var attachmentItems = new List<EmailAttachmentItem>();

        if (attachments is not null)
        {
            foreach (var attachment in attachments)
            {
                attachmentItems.Add(new EmailAttachmentItem
                {
                    FileName = attachment.FileName,
                    ContentType = attachment.ContentType,
                    FileContent = await attachment.ToBytesAsync(cancellationToken)
                });
            }
        }

        var command = new SendEmailWithTemplateCommand
        {
            Tos = request.Tos,
            Ccs = request.Ccs,
            Bccs = request.Bccs,
            ItemsCount = request.ItemsCount,
            Attachments = attachmentItems
        };

        var response = await sender.Send(command, cancellationToken);

        return Results.Ok(response);
    }
}
