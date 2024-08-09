using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using _96JD.ErrorHandlerUtils;

namespace EmergencyDepartment.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class InquiryStatusController(IGenericRepository<InquiryStatus> inquiryStatusRepository) : ControllerBase
{
	[HttpGet("fetch-all-inquiry-statuses")]
	[ProducesResponseType<IEnumerable<InquiryStatus>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllInquiryStatuses()
	{
		try
		{
			IEnumerable<InquiryStatus> allInquiryStatuses = inquiryStatusRepository
				.FetchAll()
				.OrderBy(status => status.Id);
			return Ok(new { allInquiryStatuses });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
