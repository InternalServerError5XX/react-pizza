using MediatR;

namespace pizza_api.Requests.PizzaRequests;

public record DeletePizzaQuery(int Id) : IRequest<bool>;
