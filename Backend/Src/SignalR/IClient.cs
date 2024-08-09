using EmergencyDepartment.Models;

namespace EmergencyDepartment.SignalR;

public interface IClient
{
	Task AssigningNurse(int inquiryStatusId);

	Task TypingMessage(ChatMessage chatMessage);

	Task ReceivingMessage(ChatMessage chatMessage);
}
