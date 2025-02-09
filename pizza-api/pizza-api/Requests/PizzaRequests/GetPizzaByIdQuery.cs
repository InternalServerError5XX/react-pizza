using MediatR;
using pizza_api.Entities;

namespace pizza_api.Requests.PizzaRequests;

public record GetPizzaByIdQuery(int Id) : IRequest<Pizza>;
