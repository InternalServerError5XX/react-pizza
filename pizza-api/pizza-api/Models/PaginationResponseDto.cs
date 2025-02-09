namespace pizza_api.Models;

public class PaginationResponseDto<T>
{
    public PaginationResponseDto() { }

    public PaginationResponseDto(FilterModel filter, List<T> data)
    {
        TotalPages = (int)Math.Ceiling((double)data.Count / filter.PageSize);

        Data = data
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToList();

        PageNumber = filter.PageNumber;
        PageSize = filter.PageSize;
    }

    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public List<T> Data { get; set; } = [];
}
