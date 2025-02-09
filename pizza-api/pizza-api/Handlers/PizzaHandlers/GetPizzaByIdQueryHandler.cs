using MediatR;
using pizza_api.Entities;
using pizza_api.Requests.PizzaRequests;
using pizza_api.Services.PizzaService;

namespace pizza_api.Handlers.PizzaHandlers;

public class GetPizzaByIdQueryHandler(IPizzaService pizzaService) : IRequestHandler<GetPizzaByIdQuery, Pizza>
{
    public Task<Pizza> Handle(GetPizzaByIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(pizzaService.GetById(request.Id));
    }
}
