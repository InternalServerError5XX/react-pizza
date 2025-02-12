using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;
using pizza_api.Entities;
using pizza_api.Enums;
using pizza_api.Models.Auth;
using pizza_api.Models.Jwt;

namespace pizza_api.Services.AuthService;

public class AuthService : IAuthService
{
    private readonly List<User> _users = [];
    private readonly ILogger<IAuthService> _logger;
    private readonly JwtTokenSettings _tokenSettings;

    public AuthService(ILogger<IAuthService> logger)
    {
        _logger = logger;
        var json = File.ReadAllText("data/users.json");

        if (string.IsNullOrEmpty(json))
            return;

        _users = JsonSerializer.Deserialize<List<User>>(json)!;
        _tokenSettings = new JwtTokenSettings();
    }

    public string Login(LoginDto loginDto)
    {
        var user = _users.FirstOrDefault(x => x.Email == loginDto.Email);
        if (user == null)
            throw new NullReferenceException("User does not exist");

        if (user.Password != loginDto.Password)
            throw new Exception("Invalid password");

        _logger.LogInformation($"User with id {user.Id} logined");
        return GenerateToken(user.Email, user.UserRole.ToString());
    }

    public string Register(RegisterDto registerDto)
    {
        var user = _users.FirstOrDefault(x => x.Email == registerDto.Email);
        if (user != null)
            throw new Exception("User already exists");

        var id = _users.Max(x => x.Id) + 1;
        var newUser = new User
        {
            Id = id,
            Email = registerDto.Email,
            Name = registerDto.Name,
            Password = registerDto.Password,
            UserRole =  UserRoles.User,
        };

        _logger.LogInformation($"User with id {id} registered");
        _users.Add(newUser);

        var loginDto = new LoginDto
        {
            Email = newUser.Email,
            Password = newUser.Password,
        };

        return Login(loginDto);
    }

    private string GenerateToken(string email, string role)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_tokenSettings.JwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            ]),

            Issuer = _tokenSettings.JwtIssuer,
            Audience = _tokenSettings.JwtAudience,
            Expires = DateTime.UtcNow.AddHours(_tokenSettings.JwtExpires),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
