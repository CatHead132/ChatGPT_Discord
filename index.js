require("dotenv").config()

const {Client, GatewayIntentBits} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    organization:process.env.OPENAI_ORG,
    apiKey:process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration)

client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        console.log(message.content)
        

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: '' + message.content,
            temperature: 0.5,
            max_tokens: 900,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        
        console.log(response.data.choices[0].text)
        message.reply(response.data.choices[0].text)
    } catch (error) {

        console.log(error)
    }
})

client.login(process.env.DISCORD_KEY);




