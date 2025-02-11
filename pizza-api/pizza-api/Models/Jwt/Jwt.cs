using System.IdentityModel.Tokens.Jwt;

namespace pizza_api.Models.Jwt;

public class Jwt
{
    public JwtSecurityToken Token { get; set; } = new JwtSecurityToken();
    public DateTime Expiration { get; set; }
    public string TokenValue { get; set; } = string.Empty;
    public CookieOptions CookieOptions { get; set; } = new CookieOptions();
}
