using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using _96JD.ErrorHandlerUtils;

namespace EmergencyDepartment.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class UserRoleController(IGenericRepository<UserRole> userRoleRepository) : ControllerBase
{
	[HttpGet("fetch-all-user-roles")]
	[ProducesResponseType<IEnumerable<UserRole>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllUserRoles()
	{
		try
		{
			IEnumerable<UserRole> allUserRoles = userRoleRepository.FetchAll().OrderBy(role => role.Id);
			return Ok(new { allUserRoles });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
