using EmergencyDepartment.Models;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class InquiryStatusRepository(EmergencyDepartmentContext db) : GenericRepository<InquiryStatus>(db) { }
