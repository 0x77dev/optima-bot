import Telegraf from "telegraf";
// @ts-ignore
import google from "./google";
// @ts-ignore
const puppeteer = require('puppeteer');

interface SearchResult { title: string; description: string; url: string; }

if (!process.env.BOT_TOKEN) {
    console.error("[ERROR]", "Telegram Token is not defined in env.")
    process.exit(-1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

(async () => {

    const browser = await puppeteer.launch();

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    bot.on('message', async (ctx) => {
        const query = ctx.message?.text;
        if (query !== undefined) {
            const results: SearchResult[] = await google(browser, query);
            if (results.length === 0) ctx.reply("Я тупой, и такого не знаю.");
            // results.forEach(async (result: SearchResult) => {
            //     await delay(1000);
            //     ctx.replyWithHTML(`
            //         <b>${result.title}</b>
            //         <i>${result.description}</i>
            //         \n
            //         <a href="${result.url}">Source</a>
            //     `);
            // })
            await delay(1000);
            ctx.replyWithHTML(`
                <a href="${results[0].url}"><b>${results[0].title}</b></a>
                <i>${results[0].description}</i>
                \n
            `);
        }
    })



})()

bot.start((ctx) => ctx.reply('Спрашивай...'));

bot.launch()