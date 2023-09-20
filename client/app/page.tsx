"use client";
import { useState } from "react";
import Axios from "axios";
export default function Home() {
  const [image, setImage] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };
  const onsubmit = async () => {
    setIsUploading(true);
    if (image) {
      // sending meta data to server
      const response = await Axios.post<
        { message: string; preSignedUrl: string },
        any
      >("http://localhost:3001/upload", {
        filename: image.name,
        mimetype: image.type,
      });

      if (response.data) {
        const options = {
          headers: {
            "Content-Type": image.type,
            //  onUploadProgress: function (progressEvent) {
            //     let percentCompleted = Math.round(
            //       (progressEvent.loaded * 100) / progressEvent.total
            //     );
            //     console.log(percentCompleted);
            //   },
          },
        };
        // uploading video to AWS-s3 bucket using SignedURL
        Axios.put(response.data.preSignedUrl, image, options)
          .then((result) => {
            setIsUploading(false);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
      {!success ? (
        ""
      ) : (
        <div className="p-2 border-solid border-2 rounded-md mb-5">
          <p className=" text-green-400">Video Uploaded Successful</p>
        </div>
      )}

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
          {isUploading ? "Uploading.." : "Upload"}
        </button>
      </div>
    </div>
  );
}
