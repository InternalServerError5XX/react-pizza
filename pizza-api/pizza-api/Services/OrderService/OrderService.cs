using pizza_api.Entities;
using pizza_api.Models.Order;
using pizza_api.Services.AuthService;

namespace pizza_api.Services.OrderService;

public class OrderService(IAuthService authService, ILogger<IOrderService> logger) : IOrderService
{
    private readonly List<Order> _orders = [];

    public Order CreateOrder(CreateOrderDto orderDto)
    {
        var user = authService.CheckUser(orderDto.UserId);

        var order = new Order
        {
            Id = _orders.Any() ? _orders.Max(x => x.Id) + 1 : 1,
            UserId = orderDto.UserId,
            Items = orderDto.Items,
        };

        _orders.Add(order);
        logger.LogInformation($"Order created: {order.Id}");

        return order;
    }
}
