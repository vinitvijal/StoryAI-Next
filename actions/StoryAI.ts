'use server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);



async function storyGen(info: String, extra?: String){
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = "Write a story in simple english";
    const result = await model.generateContent([prompt, info?.toString(), extra as string]);
    const response = await result.response;
    const text = response.text();
    return text;

}


async function imageMeaningGen(imageData: String){
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    console.log("Meaning Generating")
    const prompt = "What's in this picture?";

    if (imageData === null) {
        return;
    }
    const result = await model.generateContent([prompt, imageData.toString()]);
    const response = await result.response;
    const text = response.text();
    console.log("Meaning Generated")
    return text;
}


export default async function GetStory(image: String, extraPrompt?: String) {
    console.log("Starting Meaning Generation")
    console.log(extraPrompt)
    const data = await imageMeaningGen(image);
    console.log(data)
    if (data === undefined) {
        return NextResponse.json({
            message: "Error in image processing",
        });
    }
    console.log("Starting Story Generation")
    const story = await storyGen(data, extraPrompt);
    return story;
}