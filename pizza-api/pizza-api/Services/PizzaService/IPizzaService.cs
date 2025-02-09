using pizza_api.Entities;
using pizza_api.Models.Pizza;

namespace pizza_api.Services.PizzaService;

public interface IPizzaService
{
    List<Pizza> GetAll();
    Pizza GetById(int id);
    Pizza Create(CreatePizzaDto pizzaDto);
    Pizza Update(int id, UpdatePizzaDto pizzaDto);
    bool Delete(int id);
}
