using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pizza_api.Models.Order;
using pizza_api.Requests.OrderRequests;

namespace pizza_api.Controllers;

[Route("api/orders")]
[ApiController]
[TypeFilter(typeof(ExceptionFilter))]
public class OrdersController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
    {
        var response = await mediator.Send(new CreateOrderQuery(createOrderDto));
        return Ok(response);
    }
}
