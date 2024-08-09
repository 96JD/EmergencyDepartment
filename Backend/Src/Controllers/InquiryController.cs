using System.Globalization;
using EmergencyDepartment.Constants;
using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;
using EmergencyDepartment.SignalR;
using EmergencyDepartment.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using _96JD.ErrorHandlerUtils;

namespace EmergencyDepartment.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class InquiryController(
	IHubContext<EmergencyDepartmentHub, IClient> EmergencyDepartmentHub,
	IGenericRepository<Inquiry> inquiryRepository,
	IGenericRepository<User> userRepository
) : ControllerBase
{
	[HttpGet("fetch-all-inquiries")]
	[ProducesResponseType<IEnumerable<Inquiry>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllInquiries()
	{
		try
		{
			IEnumerable<Inquiry> allInquiries = inquiryRepository.FetchAll();
			return Ok(new { allInquiries });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpGet("fetch-inquiry({id:int})")]
	[ProducesResponseType<Inquiry>(StatusCodes.Status200OK)]
	public IActionResult FetchInquiry(int id)
	{
		try
		{
			Inquiry dbInquiry = inquiryRepository.FetchSingleByKey(id);
			if (dbInquiry == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(InquiryConstants.ModelName, "id"));
			}
			return Ok(new { selectedInquiry = dbInquiry });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpGet("fetch-inquiries-counts({year:int})")]
	[ProducesResponseType<object>(StatusCodes.Status200OK)]
	public IActionResult FetchInquiriesCounts(int year)
	{
		try
		{
			var inquiriesCounts = new
			{
				ActiveInquiriesCount = InquiryCountGenerator.GetCountByStatus(
					inquiryRepository,
					InquiryStatusConstants.Active,
					year
				),
				InProgressInquiriesCount = InquiryCountGenerator.GetCountByStatus(
					inquiryRepository,
					InquiryStatusConstants.InProgress,
					year
				),
				FinishedInquiriesCount = InquiryCountGenerator.GetCountByStatus(
					inquiryRepository,
					InquiryStatusConstants.Finished,
					year
				),
			};
			return Ok(new { inquiriesCounts });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpGet("fetch-active-inquiries-count")]
	[ProducesResponseType<int>(StatusCodes.Status200OK)]
	public IActionResult FetchActiveInquiriesCount()
	{
		try
		{
			int activeInquiriesCount = inquiryRepository
				.FetchAllWhere(i => i.InquiryStatusId == InquiryStatusConstants.Active)
				.Count();
			return Ok(new { activeInquiriesCount });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPost("create-inquiry")]
	[ProducesResponseType<Inquiry>(StatusCodes.Status200OK)]
	public IActionResult CreateInquiry(IFormCollection formData)
	{
		try
		{
			string title = formData["title"]!;
			if (string.IsNullOrEmpty(title))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("title"));
			}
			else
			{
				if (
					title.Length < InquiryConstants.TitleMinimumValidLength
					|| title.Length > InquiryConstants.TitleMaximumValidLength
				)
				{
					return BadRequest(
						ErrorHandlerUtils.ParameterMustBeBetweenLengths(
							"title",
							InquiryConstants.TitleMinimumValidLength,
							InquiryConstants.TitleMaximumValidLength
						)
					);
				}
			}

			string description = formData["description"]!;
			if (string.IsNullOrEmpty(description))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("description"));
			}
			else
			{
				if (description.Length < InquiryConstants.DescriptionMinimumValidLength)
				{
					return BadRequest(
						ErrorHandlerUtils.ParameterMustBeAtLeastLength(
							"description",
							InquiryConstants.DescriptionMinimumValidLength
						)
					);
				}
			}

			string generalPractitioner = formData["generalPractitioner"]!;
			if (string.IsNullOrEmpty(generalPractitioner))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("generalPractitioner"));
			}
			else
			{
				if (
					generalPractitioner.Length < InquiryConstants.GeneralPractitionerMinimumValidLength
					|| generalPractitioner.Length > InquiryConstants.GeneralPractitionerMaximumValidLength
				)
				{
					return BadRequest(
						ErrorHandlerUtils.ParameterMustBeBetweenLengths(
							"generalPractitioner",
							InquiryConstants.GeneralPractitionerMinimumValidLength,
							InquiryConstants.GeneralPractitionerMaximumValidLength
						)
					);
				}
			}

			Inquiry inquiry =
				new()
				{
					Title = title,
					Description = description,
					GeneralPractitioner = generalPractitioner
				};

			string patientPersonNumber = formData["patientPersonNumber"]!;
			if (!string.IsNullOrEmpty(patientPersonNumber))
			{
				long parsedPatientPersonNumber = long.Parse(patientPersonNumber);

				User dbUser = userRepository.FetchSingleByKey(parsedPatientPersonNumber);
				if (dbUser == null)
				{
					return BadRequest(ErrorHandlerUtils.EntityNotFound(UserConstants.ModelName, "patientPersonNumber"));
				}
				else
				{
					inquiry.PatientPersonNumber = parsedPatientPersonNumber;
				}
			}

			ICollection<InquiryImage> images = [];

			foreach (IFormFile file in formData.Files)
			{
				string url = ImageHandler.UploadImage($"{patientPersonNumber}/", file);
				images.Add(new InquiryImage() { Url = url });
			}

			inquiry.InquiryImages = images;

			inquiryRepository.Create(inquiry);
			inquiryRepository.SaveChanges();

			return Ok(new { createdInquiry = inquiry });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPost("send-message")]
	public async Task<IActionResult> SendMessage(IFormCollection formData)
	{
		try
		{
			long SenderPersonNumber = long.Parse(formData["senderPersonNumber"]!);
			long receiverPersonNumber = long.Parse(formData["receiverPersonNumber"]!);
			int inquiryId = int.Parse(formData["inquiryId"]!);

			ChatMessage chatMessage =
				new()
				{
					SenderPersonNumber = SenderPersonNumber,
					ReceiverPersonNumber = receiverPersonNumber,
					InquiryId = inquiryId
				};

			string message = formData["message"]!;
			IFormFileCollection images = formData.Files;

			if (!string.IsNullOrEmpty(message))
			{
				chatMessage.Text = message;
			}
			else
			{
				if (images.Count == 0)
				{
					return BadRequest(ErrorHandlerUtils.FilesNotUploaded("images"));
				}
				foreach (IFormFile image in images)
				{
					string url = ImageHandler.UploadImage($"{inquiryId}/", image);
					chatMessage.ImageUrl = url;
				}
			}

			Inquiry dbInquiry = inquiryRepository.FetchSingleByKey(inquiryId);
			if (dbInquiry == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(InquiryConstants.ModelName, "id"));
			}

			dbInquiry.ChatMessages.Add(chatMessage);

			await EmergencyDepartmentHub.Clients.All.ReceivingMessage(chatMessage);

			inquiryRepository.Update(dbInquiry);
			inquiryRepository.SaveChanges();
			return Ok(new { updatedInquiry = dbInquiry });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPut("update-inquiry")]
	public async Task<IActionResult> UpdateInquiry(Inquiry inquiry)
	{
		try
		{
			if (inquiry.Id == 0)
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("id"));
			}

			if (string.IsNullOrEmpty(inquiry.NursePersonNumber.ToString()))
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("nursePersonNumber"));
			}

			if (inquiry.InquiryStatusId == 0)
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("inquiryStatusId"));
			}

			Inquiry dbInquiry = inquiryRepository.FetchSingleByKey(inquiry.Id);
			if (dbInquiry == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(UserConstants.ModelName, "id"));
			}

			if (inquiry.InquiryStatusId == InquiryStatusConstants.InProgress)
			{
				dbInquiry.NursePersonNumber = inquiry.NursePersonNumber;

				await EmergencyDepartmentHub.Clients.All.AssigningNurse(dbInquiry.InquiryStatusId);
			}

			dbInquiry.InquiryStatusId = inquiry.InquiryStatusId;
			dbInquiry.Summary = inquiry.Summary;

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
				dbInquiry.UpdatedDate = updatedDate;
			}

			inquiryRepository.Update(dbInquiry);
			inquiryRepository.SaveChanges();
			return Ok(new { updatedInquiry = dbInquiry });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
