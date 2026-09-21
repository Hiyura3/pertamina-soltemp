using Microsoft.JSInterop;

namespace SolutionTemplate2.FrontEnd.WebUi.Common.Services.Clipboard;

public sealed class ClipboardService(IJSRuntime jsRuntime)
{
    public ValueTask WriteTextAsync(string text)
    {
        return jsRuntime.InvokeVoidAsync("navigator.clipboard.writeText", text);
    }
}
