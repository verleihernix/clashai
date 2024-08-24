import * as axios from "axios";
import * as crypto from "crypto";

/** 
 * Defines the possible roles in a conversation.
 * - "user": The person interacting with the model.
 * - "system": The system or administrative messages.
 * - "assistant": The model's responses.
 */
export type Role = "user" | "system" | "assistant";

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
}

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
export type GPTModels = 
| "gpt-4o"
| "chatgpt-4o-latest"
| "gpt-4-turbo"
| "gpt-4o-2024-08-06"
| "gpt-4o-mini"
| "gpt-4"
| "gpt-4o-2024-05-13"
| "gpt-4o-mini-2024-07-18";

/**
 * A class for interacting with the ClashAI API using GPT models.
 * @class
 */
export class GPT
{
    /**
     * The API key used to authenticate with the ClashAI API.
     * @private
     * @type {string}
     */
    #api_key: string;
    /**
     * The model used for generating completions.
     * @private
     * @type {GPTModels}
     */
    #model: GPTModels;
    /**
     * The base URL for the ClashAI API.
     * @private
     * @type {string}
     * @default "http://clashai.3utilities.com:25621"
     */
    #base_url: string = 'http://clashai.3utilities.com:25621';
    /**
     * A map of user IDs to their conversation history.
     * @private
     * @type {Map<string, Array<{ role: Role, content: string }>>}
     */
    #user_histories: Map<string, Array<{ role: Role, content: string }>> = new Map();

    /**
     * Returns the user histories map.
     * @returns {Map<string, Array<{ role: Role, content: string }>>}
     */
    public get user_histories(): Map<string, Array<{ role: Role, content: string }>> {
        return this.#user_histories;
    }

    /**
     * Gets the conversation history for a user.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Array<{ role: string, content: string }> | undefined}
     * @private
     * @function
     */
    #get_user_history(
        user_id: string
    ): Array<{ role: string, content: string }> | undefined {
        if (!this.#user_histories.has(user_id)) {
            this.#user_histories.set(user_id, []);
        }
        return this.#user_histories.get(user_id);
    }

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
    constructor(
        api_key: string,
        model: GPTModels
    ) {
        if (!api_key) {
            throw new Error("API key is required.");
        } else if (!model) {
            throw new Error("Model is required.");
        }
        this.#api_key = api_key;
        this.#model = model;
    }

    /**
     * Asks the model a question and returns the response.
     * @param {string} message - The message to send to the model (question).
     * @param {Array<{ role: Role, content: string }> = []} messages - Here you can set the roles of the model and user. 
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<GPTResponse> | undefined} - The response from the model. `Undefined` if an error occurs.
     */
    public async ask(
        message: string,
        messages: Array<{ role: Role, content: string }> = [],
        user_id?: string,
    ): Promise<GPTResponse | undefined> {
        if (!user_id) {
            user_id = crypto.randomUUID();
        }

        const user_history = this.#get_user_history(user_id);
        user_history?.push(...messages);
        user_history?.push({ role: "user", content: message });
        
        try {
            const response: Axios.AxiosXHR<GPTResponse> = await axios.post(`${this.#base_url}/v1/chat/completions`, {
                model: this.#model,
                messages: user_history,
            }, {
                headers: {
                    "Authorization": `Bearer ${this.#api_key}`,
                    "Content-Type": "application/json",
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
