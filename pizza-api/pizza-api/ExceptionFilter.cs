using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace pizza_api;

public class ExceptionFilter(ILogger<ExceptionFilter> logger) : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        context.Result = new BadRequestObjectResult(new
        {
            Error = context.Exception.Message,
            Trace = context.Exception.StackTrace
        });

        context.ExceptionHandled = true;
        logger.LogError(context.Exception.Message);
    }

}
