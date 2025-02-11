using MediatR;
using pizza_api.Models.Auth;

namespace pizza_api.Requests.AuthRequests;

public record RegisterQuery(RegisterDto RegisterDto) : IRequest<string>;
