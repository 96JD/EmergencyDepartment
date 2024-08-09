using EmergencyDepartment.Models;
using Microsoft.AspNetCore.SignalR;

namespace EmergencyDepartment.SignalR;

public class EmergencyDepartmentHub : Hub<IClient>
{
	public async Task UserIsTyping(long senderPersonNumber, string text)
	{
		await Clients.All.TypingMessage(new ChatMessage { SenderPersonNumber = senderPersonNumber, Text = text });
	}
}
