using EmergencyDepartment.Models;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class UserRepository(EmergencyDepartmentContext db) : GenericRepository<User>(db) { }
