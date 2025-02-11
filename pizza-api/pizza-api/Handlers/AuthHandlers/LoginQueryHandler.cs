using MediatR;
using pizza_api.Requests.AuthRequests;
using pizza_api.Services.AuthService;

namespace pizza_api.Handlers.AuthHandlers;

public class LoginQueryHandler(IAuthService authService) : IRequestHandler<LoginQuery, string>
{
    public Task<string> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(authService.Login(request.LoginDto));
    }
}
