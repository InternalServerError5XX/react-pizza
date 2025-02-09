using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> Create(CreatePizzaDto pizzaDto)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var response = await mediator.Send(new CreatePizzaQuery(pizzaDto));
        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
    }

    [HttpPatch]
    public async Task<IActionResult> Update([Required] int id, UpdatePizzaDto pizzaDto)
    {
        if (pizzaDto == null)
            return BadRequest();

        var response = await mediator.Send(new UpdatePizzaQuery(id, pizzaDto));
        if (response == null)
            return NotFound();

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await mediator.Send(new DeletePizzaQuery(id));
        if (!response)
            return NotFound();

        return NoContent();
    }
}
