using MediatR;
using pizza_api.Entities;
using pizza_api.Models;

namespace pizza_api.Requests.PizzaRequests;

public record GetAllPizzasQuery(FilterModel Filter) : IRequest<PaginationResponseDto<Pizza>>;
