using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using EmergencyDepartment.Constants;
using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;
using EmergencyDepartment.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using _96JD.ErrorHandlerUtils;
using _96JD.PasswordUtils;

namespace EmergencyDepartment.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public partial class UserController(IGenericRepository<User> userRepository) : ControllerBase
{
	private const string PersonNumberKey = "personNumber";

	[HttpPost("login-user")]
	public async Task<IActionResult> LoginUser()
	{
		try
		{
			JsonDocument document = await JsonDocument.ParseAsync(Request.Body);
			JsonElement root = document.RootElement;

			if (!root.TryGetProperty(PersonNumberKey, out JsonElement personNumberElement))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue(PersonNumberKey));
			}

			if (!root.TryGetProperty("password", out JsonElement passwordElement))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("password"));
			}

			string personNumber = personNumberElement.GetString()!;
			string password = passwordElement.GetString()!;

			User dbUser = userRepository.FetchSingleByKey(long.Parse(personNumber));

			if (dbUser != null)
			{
				if (dbUser.Password == PasswordUtils.Encrypt(password))
				{
					IConfiguration configuration = AppSettingsConfigurator.GetAppSettingsJson();
					string jwtSubject = configuration.GetValue<string>("Jwt:Subject")!;
					string jwtKey = configuration.GetValue<string>("Jwt:Key")!;
					string jwtIssuer = configuration.GetValue<string>("Jwt:Issuer")!;
					string jwtAudience = configuration.GetValue<string>("Jwt:Audience")!;

					Claim[] claims =
					[
						new Claim(JwtRegisteredClaimNames.Sub, jwtSubject),
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
						new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
					];

					SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(jwtKey));
					SigningCredentials signIn = new(key, SecurityAlgorithms.HmacSha256);
					JwtSecurityToken generatedJwt =
						new(
							jwtIssuer,
							jwtAudience,
							claims,
							expires: DateTime.UtcNow.AddYears(1),
							signingCredentials: signIn
						);
					string writtenJwt = new JwtSecurityTokenHandler().WriteToken(generatedJwt);
					dbUser.Password = "********";
					return Ok(new { jwt = writtenJwt, loggedInUser = dbUser });
				}
				return BadRequest("Password is not correct.");
			}
			return BadRequest(ErrorHandlerUtils.EntityNotFound(UserConstants.ModelName, PersonNumberKey));
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[Authorize]
	[HttpGet("logout-user")]
	[ProducesResponseType<bool>(StatusCodes.Status200OK)]
	public IActionResult LogoutUser()
	{
		try
		{
			return Ok(new { loggedOut = true });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[Authorize]
	[HttpGet("fetch-all-users")]
	[ProducesResponseType<IEnumerable<User>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllUsers()
	{
		try
		{
			IEnumerable<User> allUsers = userRepository.FetchAll();
			return Ok(new { allUsers });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[Authorize]
	[ProducesResponseType<User>(StatusCodes.Status200OK)]
	[HttpGet("fetch-user({personNumber:long})")]
	public IActionResult FetchUser(long personNumber)
	{
		try
		{
			User dbUser = userRepository.FetchSingleByKey(personNumber);
			if (dbUser == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(UserConstants.ModelName, PersonNumberKey));
			}
			return Ok(new { selectedUser = dbUser });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[Authorize]
	[HttpPost("create-user")]
	[ProducesResponseType<User>(StatusCodes.Status200OK)]
	public IActionResult CreateUser(User user)
	{
		try
		{
			if (user.UserRoleId == 0)
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("userRoleId"));
			}

			User dbUserByPersonNumber = userRepository.FetchSingleByKey(user.PersonNumber);
			if (dbUserByPersonNumber != null)
			{
				return BadRequest(ErrorHandlerUtils.EntityExists(UserConstants.ModelName, PersonNumberKey));
			}

			User dbUserByPhoneNumber = userRepository.FetchSingleWhere(u => u.PhoneNumber == user.PhoneNumber);
			if (dbUserByPhoneNumber != null)
			{
				return BadRequest(ErrorHandlerUtils.EntityExists(UserConstants.ModelName, "phoneNumber"));
			}

			if (!RegexHandler.EvaluatePassword(user.Password))
			{
				return BadRequest(
					"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
				);
			}

			TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
			user.FirstName = textInfo.ToTitleCase(user.FirstName);
			user.LastName = textInfo.ToTitleCase(user.LastName);

			user.Password = PasswordUtils.Encrypt(user.Password);

			userRepository.Create(user);
			userRepository.SaveChanges();
			user.Password = "********";
			return Ok(new { createdUser = user });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[Authorize]
	[HttpPut("update-user")]
	[ProducesResponseType<User>(StatusCodes.Status200OK)]
	public IActionResult UpdateUser(User user)
	{
		try
		{
			if (user.UserRoleId == 0)
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("userRoleId"));
			}

			User dbUser = userRepository.FetchSingleByKey(user.PersonNumber);
			if (dbUser == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(UserConstants.ModelName, PersonNumberKey));
			}

			User dbUserByPhoneNumber = userRepository.FetchSingleWhere(u =>
				u.PersonNumber != user.PersonNumber && u.PhoneNumber == user.PhoneNumber
			);
			if (dbUserByPhoneNumber != null)
			{
				return BadRequest(ErrorHandlerUtils.EntityExists(UserConstants.ModelName, "phoneNumber"));
			}

			dbUser.PhoneNumber = user.PhoneNumber;
			dbUser.Address = user.Address;

			string dateTimeFormat = $"{SharedConstants.DateFormat} {SharedConstants.TimeFormat}";
			if (
				DateTime.TryParseExact(
					DateTime.Now.ToString(dateTimeFormat),
					dateTimeFormat,
					CultureInfo.InvariantCulture,
					DateTimeStyles.None,
					out DateTime updatedDate
				)
			)
			{
				dbUser.UpdatedDate = updatedDate;
			}

			userRepository.Update(dbUser);
			userRepository.SaveChanges();
			dbUser.Password = "********";
			return Ok(new { updatedUser = dbUser });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
