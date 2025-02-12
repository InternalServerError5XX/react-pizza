using Newtonsoft.Json;
using PizzaModel = pizza_api.Entities.Pizza;

namespace pizza_api.Models.Order;

public class CreateOrderDto
{
    [JsonProperty("userId")]
    public int UserId { get; set; }

    [JsonProperty("items")]
    public List<PizzaModel> Items { get; set; } = [];
}
