using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace pizza_api.Models.Auth;

public class LoginDto
{
    [Required]
    [EmailAddress]
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}
