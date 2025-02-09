using MediatR;
using pizza_api.Requests.PizzaRequests;
using pizza_api.Services.PizzaService;

namespace pizza_api.Handlers.PizzaHandlers;

public class DeletePizzaQueryHandler(IPizzaService pizzaService) : IRequestHandler<DeletePizzaQuery, bool>
{
    public Task<bool> Handle(DeletePizzaQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(pizzaService.Delete(request.Id));
    }
}
