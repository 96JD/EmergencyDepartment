using EmergencyDepartment.Models;

namespace EmergencyDepartment.Constants;

public static class UserRoleConstants
{
	public static readonly string ModelName = typeof(UserRole).Name;

	public const int Admin = 1;
	public const int Staff = 2;
	public const int Patient = 3;
}
