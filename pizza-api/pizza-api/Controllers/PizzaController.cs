using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pizza_api.Enums;
using pizza_api.Models;
using pizza_api.Models.Pizza;
using pizza_api.Requests.PizzaRequests;

namespace pizza_api.Controllers;

[Route("api/pizza")]
[ApiController]
[TypeFilter(typeof(ExceptionFilter))]
public class PizzaController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] FilterModel filterModel)
    {
        var response = await mediator.Send(new GetAllPizzasQuery(filterModel));
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var response = await mediator.Send(new GetPizzaByIdQuery(id));
        if (response == null)
            return NotFound();

        return Ok(response);
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRoles.Admin))]
    public async Task<IActionResult> Create(CreatePizzaDto pizzaDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var response = await mediator.Send(new CreatePizzaQuery(pizzaDto));
        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
    }

    [HttpPatch]
    [Authorize(Roles = nameof(UserRoles.Admin))]
    public async Task<IActionResult> Update([Required] int id, UpdatePizzaDto pizzaDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var response = await mediator.Send(new UpdatePizzaQuery(id, pizzaDto));
        if (response == null)
            return NotFound();

        return Ok(response);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = nameof(UserRoles.Admin))]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await mediator.Send(new DeletePizzaQuery(id));
        if (!response)
            return NotFound();

        return NoContent();
    }
}
