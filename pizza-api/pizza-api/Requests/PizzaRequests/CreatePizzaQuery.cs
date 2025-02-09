using MediatR;
using pizza_api.Entities;
using pizza_api.Models.Pizza;

namespace pizza_api.Requests.PizzaRequests;

public record CreatePizzaQuery(CreatePizzaDto PizzaDto) : IRequest<Pizza>;
