import { Completions } from '@effect/ai';
import { OpenAiClient, OpenAiCompletions } from '@effect/ai-openai';
import { Effect, Layer } from 'effect';
import { NodeHttpClient } from '@effect/platform-node';

const FourOMini = OpenAiCompletions.model('gpt-4o-mini');

const OpenAi = OpenAiClient.layerConfig({
	// apiKey: Config.redacted(Config.string('OPENAI_API_KEY').pipe(Config.withDefault(OPENAI_API_KEY)))
});

const OpenAiWithHttp = Layer.provide(OpenAi, NodeHttpClient.layerUndici);

const generateText = (prompt: string) =>
	Effect.gen(function* () {
		const completions = yield* Completions.Completions;

		const response = yield* completions.create(prompt);

		yield* Effect.log(response);

		return response;
	});

const loadEffect = Effect.gen(function* () {
	const gpt = yield* FourOMini;

	const resp = yield* gpt.provide(generateText('What are some fun things to do in San Francisco?'));

	// yield* Effect.log(resp);

	return resp;
});

export const load = async () => {
	console.log('start');
	await loadEffect.pipe(Effect.provide(OpenAiWithHttp), Effect.runPromise);
	console.log('end');

	return { test: 'todo' };
};
