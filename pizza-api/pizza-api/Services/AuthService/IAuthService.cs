using pizza_api.Entities;
using pizza_api.Models.Auth;

namespace pizza_api.Services.AuthService;

public interface IAuthService
{
    string Login(LoginDto loginDto);
    string Register(RegisterDto registerDto);
    void CheckUser(int id);
}
