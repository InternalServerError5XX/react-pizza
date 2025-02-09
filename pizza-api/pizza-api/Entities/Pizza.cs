using System.Text.Json.Serialization;
using pizza_api.Enums;

namespace pizza_api.Entities;

public class Pizza
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [JsonPropertyName("sizes")]
    public List<int> Sizes { get; set; } = [];

    [JsonPropertyName("types")]
    public List<PizzaTypes> PizzaTypes { get; set; } = [];

    [JsonPropertyName("price")]
    public decimal Price { get; set; }

    [JsonPropertyName("category")]
    public PizzaCategories Category { get; set; }

    [JsonPropertyName("rating")]
    public double Rating { get; set; }
}
