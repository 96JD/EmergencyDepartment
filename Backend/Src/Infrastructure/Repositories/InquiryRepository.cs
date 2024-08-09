using EmergencyDepartment.Models;
using Microsoft.EntityFrameworkCore;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class InquiryRepository(EmergencyDepartmentContext db) : GenericRepository<Inquiry>(db)
{
	public override IEnumerable<Inquiry> FetchAll()
	{
		return context.Inquiries?.Include(i => i.Nurse)!;
	}

	public override Inquiry FetchSingleByKey(int key)
	{
		return context
			.Inquiries?.Include(i => i.Nurse)
			.Include(i => i.Patient)
			.Include(i => i.ChatMessages)
			.Include(i => i.InquiryImages)
			.Where(i => i.Id == key)
			.FirstOrDefault()!;
	}
}
