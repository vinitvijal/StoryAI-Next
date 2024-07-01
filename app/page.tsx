"use client";
import GetStory from "@/actions/StoryAI";
import Image from "next/image";
import { useState } from "react";




export default function Home() {
  const [extra, setextra] = useState("");
  const [image, setImage] = useState<File>();
  const [story, setstory] = useState("");



  async function imageToStory(){
    if(image === undefined){
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async function () {
      const data = await GetStory(reader.result?.toString() || "", extra);
      console.log(data);
      setstory(data.toString());
    };
    // const data = await GetStory(data);
    
  }



  return (
    <main className=" h-screen w-full bg-white flex flex-col fixed">
      <header className=" h-16 w-full bg-[#137348] flex items-center px-5">
        <h1 className=" text-3xl font-bold">
          StoryAI{" "}
          <span className=" text-sm font-light text-[#f3fe39]">
            by codevinu
          </span>
        </h1>
      </header>
      <main className=" flex-1 w-full flex">
        <section className=" h-full flex justify-center items-center  flex-col w-2/5">
          <div className=" flex-1 w-full max-h-[70vh]  flex justify-center items-center">
            {story.length === 0 ? <Image
              src="/StoryAI.png"
              alt="alt"
              width={1000}
              height={1000}
              className=" w-4/5"
            /> : 
            <h1 className=" text-zinc-700 text-2xl p-8 overflow-y-auto text-center">{story}</h1>
            }
          </div>
          <div className=" h-20 border-t p-4">
            <h1 className=" text-black font-medium">
              StoryAI is a simple AI that generates stories from images.
            </h1>
          </div>
        </section>
        <section className=" h-full border-l flex justify-center items-center w-3/5">
          {image === undefined ? (
            <input
              className="  text-white px-4 py-3 rounded-xl bg-[#137348]  hover:bg-[#0b4b2e]"
              type="file"
              name="myImage"
              accept="image/png, image/jpeg"
              // Event handler to capture file selection and update the state
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage(event.target.files[0]);
                }
              }}
            />
          ) : (
            <div className=" h-full gap-3 flex justify-center flex-col text-black items-center">
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="alt"
                  height={100}
                  width={100}
                  className=" h-96 w-auto"
                />
              )}
              <div className=" w-full">
                <input type="text" onChange={(e)=>{setextra(e.target.value)}} name="extra" id="extra" className=" w-full p-2 rounded-md outline-none border" placeholder="Extra Prompt (Optional)"/>
              </div>
              <div className=" flex gap-2">
                <button
                  className=" text-white px-4 py-3 rounded-xl bg-[#137348] hover:bg-[#0b4b2e] "
                  onClick={() => imageToStory()}
                >
                  Generate Story
                </button>
                <button
                  className="  text-white px-4 py-3 rounded-xl bg-[#137348]  hover:bg-[#0b4b2e]"
                  onClick={() => setImage(undefined)}
                >
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </main>
  );
}
