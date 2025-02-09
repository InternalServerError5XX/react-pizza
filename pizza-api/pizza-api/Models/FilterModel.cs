using Microsoft.AspNetCore.Mvc;

namespace pizza_api.Models;

public class FilterModel
{
    [FromQuery(Name = "name")]
    public string? Name { get; set; }

    [FromQuery(Name = "category")]
    public string? Category { get; set; }

    [FromQuery(Name = "sortBy")]
    public string? SortBy { get; set; }

    [FromQuery(Name = "isAsc")]
    public bool IsAsc { get; set; } = true;

    [FromQuery(Name = "pageNumber")]
    public int PageNumber { get; set; } = 1;

    [FromQuery(Name = "pageSize")]
    public int PageSize { get; set; } = 20;
}

