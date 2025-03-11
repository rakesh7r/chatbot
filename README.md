Hey!

### Wanna try this in your local? 
#### 1. Using Docker

Please make sure you've docker installed. [Docker](https://docs.docker.com/get-started/)

try this in your terminal. 
``` 
docker pull rakesh7r/cognito:latest
```

Get your API Key from [Google AI studio](https://aistudio.google.com/apikey) and replace it with **{YOUR_API_KEY}** in the below command.

then, paste this command in your terminal.

```
docker run -p 4000:3000 \
--name cognito \
-e BASE_URL=http://localhost:4000 \
-e GEMINI_API_KEY={YOUR_API_KEY} \
rakesh7r/cognito
```

That's it, Go to ``` http://localhost:4000/``` to access the application.

#### 2. Using Nodejs server.

Make sure you've [git](https://git-scm.com/downloads) installed. 
Run these series of commands in your terminal.
```
git clone https://github.com/rakesh7r/chatbot.git

cd chatbot

pnpm install

pnpm run dev
```

That's it, Go to ``` http://localhost:3000/``` to access the application.
