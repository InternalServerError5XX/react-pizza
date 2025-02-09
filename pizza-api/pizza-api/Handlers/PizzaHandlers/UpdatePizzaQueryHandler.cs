using MediatR;
using pizza_api.Entities;
using pizza_api.Requests.PizzaRequests;
using pizza_api.Services.PizzaService;

namespace pizza_api.Handlers.PizzaHandlers;

public class UpdatePizzaQueryHandler(IPizzaService pizzaService) : IRequestHandler<UpdatePizzaQuery, Pizza>
{
    public Task<Pizza> Handle(UpdatePizzaQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(pizzaService.Update(request.Id, request.PizzaDto));
    }
}
