type Message = {
	role: 'user' | 'assistant';
	content: string;
	id: string;
};

interface ChatState {
	messages: Message[];
	isLoading: boolean;
	sendMessage: (message: string) => void;
}

export class ChatStateClass implements ChatState {
	messages = $state<Message[]>([
		{
			role: 'assistant',
			content: 'Hello! How can I help you today?',
			id: crypto.randomUUID()
		}
	]);

	isLoading = $state(false);

	private fakeResponses = [
		'This is a fake response',
		'This is another fake response',
		'This is yet another fake response'
	];

	sendMessage = (message: string) => {
		this.isLoading = true;
		this.messages.push({
			role: 'user',
			content: message,
			id: crypto.randomUUID()
		});

		setTimeout(() => {
			this.messages.push({
				role: 'assistant',
				content: this.fakeResponses[Math.floor(Math.random() * this.fakeResponses.length)],
				id: crypto.randomUUID()
			});
			this.isLoading = false;
		}, 400);
	};
}
