﻿using System.Text.Json.Serialization;
using pizza_api.Enums;

namespace pizza_api.Entities;

public class User
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("role")]
    public UserRoles UserRole { get; set; }

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}
