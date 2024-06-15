from openai import OpenAI


class OpenaiAdapter:
    """Openai Adapter"""
    def __init__(self):
        # it will access the API key from os.environ
        self.client = OpenAI()

    def chat(self, message):
        # Ensure messages is a list of message dictionaries
        formatted_messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=formatted_messages
        )
        return completion.choices[0].message.content


openai_instance = OpenaiAdapter()