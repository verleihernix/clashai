/**
 * Defines the possible roles in a conversation.
 * - "user": The person interacting with the model.
 * - "system": The system or administrative messages.
 * - "assistant": The model's responses.
 */
export type Role = "user" | "system" | "assistant";
/**
 * Represents the structure of the messages in the conversation.
 * - `role`: The role of the message sender.
 * - `content`: The content of the message.
 */
export type Messages = {
    /**
     * The role of the message sender.
     * - "user": The person interacting with the model.
     * - "system": The system or administrative messages. (with this you can set the personality of the model)
     * - "assistant": The model itself.
     */
    role: Role;
    /**
     * The content of the message.
     */
    content: string;
};
/**
 * Represents the structure of the GPT response from the API.
 */
export type GPTResponse = {
    /** Unique identifier for the response. */
    id: string;
    /** The type of object returned, typically "chat.completion". */
    object: string;
    /** The timestamp when the response was created. */
    created: number;
    /** The model that generated the response. */
    model: string;
    /** An optional fingerprint for the system that generated the response. */
    system_fingerprint: string | null;
    /** An array of choice objects, each representing a possible completion. */
    choices: Array<{
        /** The index of this choice in the array. */
        index: number;
        /** The message object containing the completion content. */
        message: {
            /** The content of the completion message. */
            content: string;
        };
        /** Log probabilities associated with this choice, if applicable. */
        logprobs: string;
        /** The reason why the completion stopped, e.g., "length" or "stop". */
        finish_reason: string;
    }>;
    /** Usage statistics for the API call. */
    usage: {
        /** Number of tokens in the prompt. */
        prompt_tokens: number;
        /** Number of tokens in the completion. */
        completion_tokens: number;
        /** Total number of tokens used. */
        total_tokens: number;
    };
};
/**
 * List of supported GPT models.
 * - "gpt-4o": A specific variant of GPT-4.
 * - "chatgpt-4o-latest": The latest version of ChatGPT-4o.
 * - "gpt-4-turbo": A variant of GPT-4 optimized for performance.
 * - "gpt-4o-2024-08-06": A GPT-4o model from August 6, 2024.
 * - "gpt-4o-mini": A smaller variant of GPT-4o.
 * - "gpt-4": The standard GPT-4 model.
 * - "gpt-4o-2024-05-13": A GPT-4o model from May 13, 2024.
 * - "gpt-4o-mini-2024-07-18": A mini GPT-4o model from July 18, 2024.
 */
export type GPTModels = "gpt-4o" | "chatgpt-4o-latest" | "gpt-4-turbo" | "gpt-4o-2024-08-06" | "gpt-4o-mini" | "gpt-4" | "gpt-4o-2024-05-13" | "gpt-4o-mini-2024-07-18";
/**
 * A class for interacting with the ClashAI API GPT models.
 * @class
 * @example
 * const gpt = new GPT("your clash ai api key", "chatgpt-4o-latest");
 */
export declare class GPT {
    #private;
    /**
     * Returns the user histories map.
     * @returns {Map<string, Array<Messages>>}
     */
    get user_histories(): Map<string, Array<Messages>>;
    /**
     * Creates a new instance of the GPT class.
     * @param {string} api_key - Your {@link https://discord.gg/t72xtYb6aT ClashAI} API key
     * @param {GPTModels} model - The model to use for generating completions.
     * @constructor
     * @example
     * const gpt = new GPT("your clash ai api key", "chatgpt-4o-latest");
     * (async () => {
     *    const response = await gpt.ask("Hello, how are you?", [{ role: "system", content: "You are a friendly chatbot." }]);
     *    console.log(response.choices[0].message.content);
     * })();
     */
    constructor(api_key: string, model: GPTModels);
    /**
     * Asks the model a question and returns the response.
     * @param {string} message - The message to send to the model (question).
     * @param {Array<Messages> = []} messages - Here you can set the roles of the model and user.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<GPTResponse> | undefined} - The response from the model. `Undefined` if an error occurs.
     */
    ask(message: string, messages?: Array<Messages>, user_id?: string): Promise<GPTResponse | undefined>;
}
