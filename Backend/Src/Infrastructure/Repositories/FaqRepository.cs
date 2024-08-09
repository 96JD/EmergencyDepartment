using EmergencyDepartment.Models;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class FaqRepository(EmergencyDepartmentContext db) : GenericRepository<Faq>(db) { }
