import { saveMessagesRequestSchema } from '$lib/shared/api/requestSchemas';
import { Effect, pipe, Schema } from 'effect';

const postEffect = (request: Request) =>
	Effect.gen(function* () {
		const body = yield* pipe(
			Effect.tryPromise(() => request.text()),
			Effect.flatMap((raw) => Schema.decode(saveMessagesRequestSchema)(raw))
		);

		yield* Effect.log('parsedBody', body);

		return new Response(JSON.stringify({ success: true }));
	});

export const POST = async ({ request }) => {
	const response = await Effect.runPromise(postEffect(request));

	return response;
};
