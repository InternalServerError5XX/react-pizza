using MediatR;
using pizza_api.Entities;
using pizza_api.Enums;
using pizza_api.Models;
using pizza_api.Requests.PizzaRequests;
using pizza_api.Services.PizzaService;

namespace pizza_api.Handlers.PizzaHandlers;

public class GetAllPizzasQueryHandler(IPizzaService pizzaService) : IRequestHandler<GetAllPizzasQuery, PaginationResponseDto<Pizza>>
{
    public Task<PaginationResponseDto<Pizza>> Handle(GetAllPizzasQuery request, CancellationToken cancellationToken)
    {
        var pizzas = pizzaService.GetAll();

        if (!string.IsNullOrEmpty(request.Filter.Name))
            pizzas = pizzas.Where(p => p.Name.Contains(request.Filter.Name, StringComparison.OrdinalIgnoreCase)).ToList();

        if (!string.IsNullOrWhiteSpace(request.Filter.Category) && Enum.TryParse<PizzaCategories>(request.Filter.Category, true, out var categoryEnum))
            pizzas = pizzas.Where(p => p.Category == categoryEnum).ToList();

        pizzas = request.Filter.SortBy?.ToLower() switch
        {
            "price" => request.Filter.IsAsc ? pizzas.OrderBy(p => p.Price).ToList() : pizzas.OrderByDescending(p => p.Price).ToList(),
            "rating" => request.Filter.IsAsc ? pizzas.OrderBy(p => p.Rating).ToList() : pizzas.OrderByDescending(p => p.Rating).ToList(),
            "alphabet" => request.Filter.IsAsc ? pizzas.OrderBy(p => p.Name).ToList() : pizzas.OrderByDescending(p => p.Name).ToList(),
            _ => pizzas
        };

        var response = new PaginationResponseDto<Pizza>(request.Filter, pizzas);
        return Task.FromResult(response);
    }
}

