using MediatR;
using pizza_api.Models.Auth;

namespace pizza_api.Requests.AuthRequests;

public record LoginQuery(LoginDto LoginDto) : IRequest<string>;
