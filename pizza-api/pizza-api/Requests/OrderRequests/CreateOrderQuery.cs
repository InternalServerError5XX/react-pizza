using MediatR;
using pizza_api.Entities;
using pizza_api.Models.Order;

namespace pizza_api.Requests.OrderRequests;

public record CreateOrderQuery(CreateOrderDto CreateOrderDto) : IRequest<Order>;
