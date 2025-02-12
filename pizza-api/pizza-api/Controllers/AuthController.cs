using MediatR;
using Microsoft.AspNetCore.Mvc;
using pizza_api.Models.Auth;
using pizza_api.Requests.AuthRequests;

namespace pizza_api.Controllers;

[Route("api/auth")]
[ApiController]
[TypeFilter(typeof(ExceptionFilter))]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var response = await mediator.Send(new LoginQuery(loginDto));
        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var response = await mediator.Send(new RegisterQuery(registerDto));
        return Ok(response);
    }
}
