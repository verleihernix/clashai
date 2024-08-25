"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _GPT_instances, _GPT_api_key, _GPT_model, _GPT_base_url, _GPT_user_histories, _GPT_get_user_history;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPT = void 0;
const axios = __importStar(require("axios"));
const crypto = __importStar(require("crypto"));
/**
 * A class for interacting with the ClashAI API GPT models.
 * @class
 * @example
 * const gpt = new GPT("your clash ai api key", "chatgpt-4o-latest");
 */
class GPT {
    /**
     * Returns the user histories map.
     * @returns {Map<string, Array<Messages>>}
     */
    get user_histories() {
        return __classPrivateFieldGet(this, _GPT_user_histories, "f");
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
    constructor(api_key, model) {
        _GPT_instances.add(this);
        /**
         * The API key used to authenticate with the ClashAI API.
         * @private
         * @type {string}
         */
        _GPT_api_key.set(this, void 0);
        /**
         * The model used for generating completions.
         * @private
         * @type {GPTModels}
         */
        _GPT_model.set(this, void 0);
        /**
         * The base URL for the ClashAI API.
         * @private
         * @type {string}
         * @default "http://clashai.3utilities.com:25621"
         */
        _GPT_base_url.set(this, 'http://clashai.3utilities.com:25621');
        /**
         * A map of user IDs to their conversation history.
         * @private
         * @type {Map<string, Array<Messages>>}
         */
        _GPT_user_histories.set(this, new Map());
        if (!api_key) {
            throw new Error("API key is required.");
        }
        else if (!model) {
            throw new Error("Model is required.");
        }
        __classPrivateFieldSet(this, _GPT_api_key, api_key, "f");
        __classPrivateFieldSet(this, _GPT_model, model, "f");
    }
    /**
     * Asks the model a question and returns the response.
     * @param {string} message - The message to send to the model (question).
     * @param {Array<Messages> = []} messages - Here you can set the roles of the model and user.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<GPTResponse> | undefined} - The response from the model. `Undefined` if an error occurs.
     */
    async ask(message, messages = [], user_id) {
        if (!user_id) {
            user_id = crypto.randomUUID();
        }
        const user_history = __classPrivateFieldGet(this, _GPT_instances, "m", _GPT_get_user_history).call(this, user_id);
        user_history?.push(...messages);
        user_history?.push({ role: "user", content: message });
        try {
            const response = await axios.post(`${__classPrivateFieldGet(this, _GPT_base_url, "f")}/v1/chat/completions`, {
                model: __classPrivateFieldGet(this, _GPT_model, "f"),
                messages: user_history,
            }, {
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _GPT_api_key, "f")}`,
                    "Content-Type": "application/json",
                }
            });
            const assistant_message = response.data.choices[0].message.content;
            user_history?.push({ role: "assistant", content: assistant_message }); // Chat history (Adds the assistant message to the chat/user history)
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.GPT = GPT;
_GPT_api_key = new WeakMap(), _GPT_model = new WeakMap(), _GPT_base_url = new WeakMap(), _GPT_user_histories = new WeakMap(), _GPT_instances = new WeakSet(), _GPT_get_user_history = function _GPT_get_user_history(user_id) {
    if (!__classPrivateFieldGet(this, _GPT_user_histories, "f").has(user_id)) {
        __classPrivateFieldGet(this, _GPT_user_histories, "f").set(user_id, []);
    }
    return __classPrivateFieldGet(this, _GPT_user_histories, "f").get(user_id);
};
