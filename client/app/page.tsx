"use client";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };
  const onsubmit = async () => {
    const body = new FormData();
    if (image) {
      body.append("file", image);
      console.log({ body });
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body,
      });
      console.log({ response });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        height: "100vh",
      }}
      className="w-full bg-gray-100  p-10 "
    >
      <h1 className=" text-center font-bold text-3xl pb-5">
        Video Transcoder Service
      </h1>
      <div className=" w-3/5 flex mt-2 bg-white align-middle justify-center pt-10 pb-10 pl-2 pr-2 shadow-lg rounded-md">
        <input type="file" name="file" onChange={uploadToClient} />
        <button
          className=" bg-pink-700 text-white pt-2 pb-2 pl-4 pr-4 rounded-md"
          type="submit"
          onClick={onsubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
