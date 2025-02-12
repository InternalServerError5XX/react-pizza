using MediatR;
using pizza_api.Entities;
using pizza_api.Requests.OrderRequests;
using pizza_api.Services.OrderService;

namespace pizza_api.Handlers.OrderHandlers;

public class CreateOrderQueryHandler(IOrderService orderService) : IRequestHandler<CreateOrderQuery, Order>
{
    public Task<Order> Handle(CreateOrderQuery query, CancellationToken cancellationToken)
    {
        return Task.FromResult(orderService.CreateOrder(query.CreateOrderDto));
    }
}
