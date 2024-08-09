using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Models;

namespace EmergencyDepartment.Utils;

public static class InquiryCountGenerator
{
	public static object GetCountByStatus(IGenericRepository<Inquiry> inquiryRepository, int status, int year)
	{
		return inquiryRepository
			.FetchAllWhere(i => i.InquiryStatusId == status && i.ReceivedDate.Year == year)
			.GroupBy(
				i => i.ReceivedDate.Month,
				i => i.ReceivedDate,
				(month, inquiries) => new { MonthIndex = month - 1, Count = inquiries.Count() }
			);
	}
}
