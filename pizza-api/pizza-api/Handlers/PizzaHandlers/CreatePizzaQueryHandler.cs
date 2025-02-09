using MediatR;
using pizza_api.Entities;
using pizza_api.Requests.PizzaRequests;
using pizza_api.Services.PizzaService;

namespace pizza_api.Handlers.PizzaHandlers;

public class CreatePizzaQueryHandler(IPizzaService pizzaService) : IRequestHandler<CreatePizzaQuery, Pizza>
{
    public Task<Pizza> Handle(CreatePizzaQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(pizzaService.Create(request.PizzaDto));
    }
}
