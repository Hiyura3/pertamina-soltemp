using SolutionTemplate2.FrontEnd.WebUi.Layouts.Models;

namespace SolutionTemplate2.FrontEnd.WebUi.Modules.Examples.Pages;

public partial class Palette
{
    [CascadingParameter]
    public DisplayInfo DisplayInfo { get; set; } = default!;

    protected override void OnInitialized()
    {
        LoadBreadcrumbs();
    }

    protected override void LoadBreadcrumbs()
    {
        _breadcrumbItems =
        [
            MainBreadcrumbFor.Home,
            ExamplesBreadcrumbFor.Index,
            CommonBreadcrumbFor.Active(ExamplesDisplayTextFor.Palette)
        ];
    }
}
