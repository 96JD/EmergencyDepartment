using System.Globalization;
using EmergencyDepartment.Constants;
using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using _96JD.ErrorHandlerUtils;

namespace EmergencyDepartment.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class FaqController(IGenericRepository<Faq> faqRepository) : ControllerBase
{
	[HttpGet("fetch-all-faqs")]
	[ProducesResponseType<IEnumerable<Faq>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllFaqs()
	{
		try
		{
			IEnumerable<Faq> allFaqs = faqRepository.FetchAll();
			return Ok(new { allFaqs });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpGet("fetch-faq({id:int})")]
	[ProducesResponseType<Faq>(StatusCodes.Status200OK)]
	public IActionResult FetchFaq(int id)
	{
		try
		{
			Faq dbFaq = faqRepository.FetchSingleByKey(id);
			if (dbFaq == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(FaqConstants.ModelName, "id"));
			}
			return Ok(new { selectedFaq = dbFaq });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPost("create-faq")]
	[ProducesResponseType<Faq>(StatusCodes.Status200OK)]
	public IActionResult CreateFaq(Faq faq)
	{
		try
		{
			if (faq.Id != 0)
			{
				Faq dbFaq = faqRepository.FetchSingleByKey(faq.Id);
				if (dbFaq != null)
				{
					return BadRequest(ErrorHandlerUtils.EntityExists(FaqConstants.ModelName, "id"));
				}
			}

			Faq dbFaqByQuestion = faqRepository.FetchSingleWhere(f => f.Question == faq.Question);
			if (dbFaqByQuestion != null)
			{
				return BadRequest(ErrorHandlerUtils.EntityExists(FaqConstants.ModelName, "question"));
			}

			TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
			faq.Question = textInfo.ToTitleCase(faq.Question);
			faq.Answer = textInfo.ToTitleCase(faq.Answer);

			faqRepository.Create(faq);
			faqRepository.SaveChanges();
			return Ok(new { createdFaq = faq });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPut("update-faq")]
	[ProducesResponseType<Faq>(StatusCodes.Status200OK)]
	public IActionResult UpdateFaq(Faq faq)
	{
		try
		{
			if (faq.Id == 0)
			{
				return BadRequest(ErrorHandlerUtils.ParameterMissingOrIncorrectValue("id"));
			}

			Faq dbFaq = faqRepository.FetchSingleByKey(faq.Id);
			if (dbFaq == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(FaqConstants.ModelName, "id"));
			}

			Faq dbFaqByQuestion = faqRepository.FetchSingleWhere(f => f.Id != faq.Id && f.Question == faq.Question);
			if (dbFaqByQuestion != null)
			{
				return BadRequest(ErrorHandlerUtils.EntityExists(FaqConstants.ModelName, "question"));
			}

			TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
			dbFaq.Question = textInfo.ToTitleCase(faq.Question);
			dbFaq.Answer = textInfo.ToTitleCase(faq.Answer);

			faqRepository.Update(dbFaq);
			faqRepository.SaveChanges();
			return Ok(new { updatedFaq = dbFaq });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpDelete("delete-faq")]
	[ProducesResponseType<Faq>(StatusCodes.Status200OK)]
	public IActionResult DeleteFaq(Faq faq)
	{
		try
		{
			Faq dbFaq = faqRepository.FetchSingleByKey(faq.Id);
			if (dbFaq == null)
			{
				return BadRequest(ErrorHandlerUtils.EntityNotFound(FaqConstants.ModelName, "id"));
			}

			faqRepository.Delete(dbFaq);
			faqRepository.SaveChanges();
			return Ok(new { deletedFaq = dbFaq });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
