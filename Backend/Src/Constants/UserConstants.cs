using EmergencyDepartment.Models;

namespace EmergencyDepartment.Constants;

public static class UserConstants
{
	public static readonly string ModelName = typeof(User).Name;

	public const string PersonNumberInvalidErrorMessage = "Person Number is missing or not matching 11 digits long";
}
