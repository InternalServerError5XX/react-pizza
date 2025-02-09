using System.Text.Json.Serialization;
using pizza_api.Enums;

namespace pizza_api.Models.Pizza;

public class UpdatePizzaDto
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("imageUrl")]
    public string? ImageUrl { get; set; }

    [JsonPropertyName("sizes")]
    public List<int>? Sizes { get; set; }

    [JsonPropertyName("types")]
    public List<PizzaTypes>? PizzaTypes { get; set; }

    [JsonPropertyName("price")]
    public decimal? Price { get; set; }

    [JsonPropertyName("category")]
    public PizzaCategories? Category { get; set; }

    [JsonPropertyName("rating")]
    public double? Rating { get; set; }
}
