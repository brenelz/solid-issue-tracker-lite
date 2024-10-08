import { cache, redirect } from "@solidjs/router";
import OpenAI from "openai";
import { getIssueFromDb } from "./data";
import { auth } from "clerk-solidjs/server";

export const getAiDescription = cache(async (issueId: number) => {
    "use server";
    const authObj = auth();

    if (!authObj.userId) {
        return redirect('/');
    }

    return 'AI response here';

    const issue = await getIssueFromDb(authObj.userId, issueId)

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: `
You are a helpful assistant that tries to figure out what a specific programming bug means. 
You will return a paragraph with no code describing what it is and how to fix.` },
            {
                role: "user",
                content: `
I have a bug in my code that has a title of ${issue.title} and a description of ${issue.description}. 
        
The code looks something like this:

${issue.stacktrace}

How can I fix it?`,
            },
        ],
    });

    return completion.choices[0].message.content;
}, 'get-ai-description');
