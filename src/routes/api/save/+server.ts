import { saveMessagesRequestSchema } from '$lib/shared/api/requestSchemas';
import { error } from '@sveltejs/kit';
import { Cause, Effect, Exit, pipe, Schema, Chunk } from 'effect';

const postEffect = (request: Request) =>
	Effect.gen(function* () {
		const body = yield* pipe(
			Effect.tryPromise(() => request.text()),
			Effect.flatMap((raw) => Schema.decode(saveMessagesRequestSchema)(raw))
		);

		yield* Effect.log('parsedBody', body);

		return new Response(JSON.stringify({ success: true }));
	});

const runPostEffect = async (request: Request) => {
	const result = await Effect.runPromiseExit(postEffect(request));

	return Exit.match(result, {
		onSuccess: (response) => response,
		onFailure: (cause) => {
			const causes = Cause.failures(cause);
			Chunk.toReadonlyArray(causes).forEach((c) => {
				if (c._tag === 'ParseError') {
					console.error(c.message);
					error(400, { message: c.message });
				}
				error(500, { message: c.message });
			});
			// this will never happen
			return new Response('Internal Server Error', { status: 500 });
		}
	});
};

export const POST = async ({ request }) => {
	const response = await runPostEffect(request);

	return response;
};
