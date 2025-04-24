import { Schema } from 'effect';

// /api/save/messages
export const saveMessagesRequestSchema = Schema.parseJson(
	Schema.Array(
		Schema.Struct({
			role: Schema.Literal('user', 'assistant'),
			content: Schema.String,
			id: Schema.String
		})
	)
);

export type SaveMessagesRequest = Schema.Schema.Type<typeof saveMessagesRequestSchema>;

export const saveMessagesResponseSchema = Schema.parseJson(
	Schema.Struct({
		success: Schema.Boolean
	})
);

export type SaveMessagesResponse = Schema.Schema.Type<typeof saveMessagesResponseSchema>;
