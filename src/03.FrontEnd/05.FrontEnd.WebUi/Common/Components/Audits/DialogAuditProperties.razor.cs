using SolutionTemplate2.Shared.Dto.Common.Audits;

namespace SolutionTemplate2.FrontEnd.WebUi.Common.Components.Audits;

public partial class DialogAuditProperties
{
    [Parameter]
    public required AuditItemBase Audit { get; init; }
}
