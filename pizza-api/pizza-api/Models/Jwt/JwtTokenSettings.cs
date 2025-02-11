namespace pizza_api.Models.Jwt;

public class JwtTokenSettings
{
    public string JwtIssuer { get; set; } = "pizza-issuer";
    public string JwtAudience { get; set; } = "pizza-audience";
    public string JwtKey { get; set; } = "ReactPizzaJwtKeyLongerThan256Bits1234567890";
    public int JwtExpires { get; set; } = 14;
}
