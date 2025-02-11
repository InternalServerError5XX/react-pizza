using MediatR;
using pizza_api.Requests.AuthRequests;
using pizza_api.Services.AuthService;

namespace pizza_api.Handlers.AuthHandlers;

public class RegisterQueryHandler(IAuthService authService) : IRequestHandler<RegisterQuery, string>
{
    public Task<string> Handle(RegisterQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(authService.Register(request.RegisterDto));
    }
}
