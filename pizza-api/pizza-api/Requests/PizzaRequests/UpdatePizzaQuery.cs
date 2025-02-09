using MediatR;
using pizza_api.Entities;
using pizza_api.Models.Pizza;

namespace pizza_api.Requests.PizzaRequests;

public record UpdatePizzaQuery(int Id, UpdatePizzaDto PizzaDto) : IRequest<Pizza>;
