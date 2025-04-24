import {
	saveMessagesRequestSchema,
	saveMessagesResponseSchema
} from '$lib/shared/api/requestSchemas';
import { Effect, pipe, Schema } from 'effect';

type Message = {
	role: 'user' | 'assistant';
	content: string;
	id: string;
};

interface ChatState {
	messages: Message[];
	newMessage: string;
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

	newMessage = $state('');

	isLoading = $state(false);

	private fakeResponses = [
		'This is a fake response',
		'This is another fake response',
		'This is yet another fake response'
	];

	private saveMessages = Effect.gen(this, function* () {
		this.isLoading = true;

		this.messages.push({
			role: 'user',
			content: this.newMessage,
			id: crypto.randomUUID()
		});

		const resp = yield* pipe(
			Schema.encode(saveMessagesRequestSchema)(this.messages),
			Effect.flatMap((encoded) =>
				Effect.tryPromise(() =>
					fetch('/api/save', {
						method: 'POST',
						body: encoded
					})
				)
			),
			Effect.flatMap((response) => Effect.tryPromise(() => response.text())),
			Effect.flatMap((text) => Schema.decode(saveMessagesResponseSchema)(text))
		);

		if (resp.success) {
			this.messages.push({
				role: 'assistant',
				content: this.fakeResponses[Math.floor(Math.random() * this.fakeResponses.length)],
				id: crypto.randomUUID()
			});
		}

		this.isLoading = false;
		this.newMessage = '';
	});

	sendMessage = () => {
		Effect.runPromise(this.saveMessages);
	};
}
