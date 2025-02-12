using Newtonsoft.Json;

namespace pizza_api.Entities;

public class Order
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("userId")]
    public int UserId { get; set; }

    [JsonProperty("items")]
    public List<Pizza> Items { get; set; } = [];
}
