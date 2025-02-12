using pizza_api.Entities;
using pizza_api.Models.Order;

namespace pizza_api.Services.OrderService;

public interface IOrderService
{
    Order CreateOrder(CreateOrderDto order);
}
