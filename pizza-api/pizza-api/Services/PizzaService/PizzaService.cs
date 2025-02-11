using System.Text.Json;
using pizza_api.Entities;
using pizza_api.Enums;
using pizza_api.Models.Pizza;

namespace pizza_api.Services.PizzaService;

public class PizzaService : IPizzaService
{
    private readonly List<Pizza> _pizzas = [];
    private readonly ILogger<IPizzaService> _logger;

    public PizzaService(ILogger<IPizzaService> logger)
    {
        _logger = logger;
        var json = File.ReadAllText("data/pizzas.json");

        if (string.IsNullOrEmpty(json))
            return;

        _pizzas = JsonSerializer.Deserialize<List<Pizza>>(json)!;
    }

    public List<Pizza> GetAll()
    {
        return _pizzas;
    }

    public Pizza GetById(int id)
    {
        var pizza = _pizzas.FirstOrDefault(x => x.Id == id);
        if (pizza == null)
            throw new NullReferenceException("Pizza not found");

        return pizza;
    }

    public Pizza Create(CreatePizzaDto pizzaDto)
    {
        var id = _pizzas.Max(x => x.Id) + 1;
        var pizza = new Pizza
        {
            Id = id,
            Name = pizzaDto.Name,
            ImageUrl = pizzaDto.ImageUrl,
            Sizes = pizzaDto.Sizes,
            PizzaTypes = pizzaDto.PizzaTypes,
            Price = pizzaDto.Price,
            Category = pizzaDto.Category,
            Rating = 0,
        };

        _pizzas.Add(pizza);
        _logger.LogInformation($"Pizza with id {id} created");
        return pizza;
    }

    public Pizza Update(int id, UpdatePizzaDto pizzaDto)
    {
        var response = GetById(id);
        UpdateItem(response, pizzaDto);

        _logger.LogInformation($"Pizza with id {id} updated");
        return response;
    }

    public bool Delete(int id)
    {
        var pizza = GetById(id);
        _pizzas?.Remove(pizza);

        _logger.LogInformation($"Pizza with id {id} deleted");
        return true;
    }

    private void UpdateItem(Pizza pizza, UpdatePizzaDto pizzaDto)
    {
        if (!string.IsNullOrEmpty(pizzaDto.Name))
            pizza.Name = pizzaDto.Name;

        if (!string.IsNullOrEmpty(pizzaDto.ImageUrl))
            pizza.ImageUrl = pizzaDto.ImageUrl;

        if (pizzaDto.Sizes != null && pizzaDto.Sizes.Any())
            pizza.Sizes = pizzaDto.Sizes;

        if (pizzaDto.PizzaTypes != null && pizzaDto.PizzaTypes.Any())
            pizza.PizzaTypes = pizzaDto.PizzaTypes;

        if (pizzaDto.Price != null && pizzaDto.Price > 0)
            pizza.Price = pizzaDto.Price.Value;

        if (pizzaDto.Category != null && Enum.IsDefined(typeof(PizzaCategories), pizzaDto.Category))
            pizza.Category = pizzaDto.Category.Value;

        if (pizzaDto.Rating != null && pizzaDto.Rating > 0)
            pizza.Rating = pizzaDto.Rating.Value;
    }
}
