using SolutionTemplate2.Shared.Dto.Modules.MasterData.Countries.GetCountry;

namespace SolutionTemplate2.FrontEnd.WebUi.Modules.MasterData.Features.Countries.Components;

public partial class DrawerDetails
{
    [Parameter, EditorRequired]
    public CountryItem? Country { get; set; }
}
