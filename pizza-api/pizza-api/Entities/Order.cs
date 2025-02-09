namespace pizza_api.Entities;

public class Order
{
    public int Id { get; set; }
    public string Adress { get; set; } = string.Empty;
    public List<Pizza> Pizzas { get; set; } = [];
}
