using EmergencyDepartment.Models;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class UserRoleRepository(EmergencyDepartmentContext db) : GenericRepository<UserRole>(db) { }
