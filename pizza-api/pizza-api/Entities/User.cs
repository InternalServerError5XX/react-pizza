using pizza_api.Enums;

namespace pizza_api.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public UserRoles UserRole { get; set; }
}
