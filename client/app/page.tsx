"use client";
import { useState } from "react";
import Axios from "axios";
import Header from "./components/header";
import Footer from "./components/footer";
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
    <>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          height: "100vh",
        }}
        className="w-full bg-gray-50  pt-20 "
      >
        {!success ? (
          ""
        ) : (
          <div className="p-2 border-solid border-2 rounded-md mb-5">
            <p className=" text-green-400">Video Uploaded Successful</p>
          </div>
        )}

        <h1 className=" text-center text-pink-600 font-bold text-4xl pb-5">
          Video Transcoder
        </h1>
        <p className=" text-lg">
          Convert your videos into different desired resolutions
        </p>
        <p>(360p , 480p, 720p etc..)</p>
        <div className=" w-3/5 flex mt-10 bg-white align-middle justify-center pt-10 pb-10 pl-2 pr-2 shadow-lg rounded-md">
          <input type="file" name="file" onChange={uploadToClient} />
          <button
            className=" bg-pink-700 text-white pt-3 pb-3 pl-6 pr-6 rounded-md"
            type="submit"
            onClick={onsubmit}
          >
            {isUploading ? "Uploading.." : "Upload"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
