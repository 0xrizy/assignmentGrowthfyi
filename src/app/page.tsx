"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { log } from "console";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [btnClick, setBtnClick]= useState(false);
  const [seoData, setSeoData] = useState(null);

  async function handleClick() {
    console.log(url);
    try {
      const response = await axios.post("/api/seo", { url: url });
      const data = response.data;
      setSeoData(data);
      setBtnClick(true)
      const scrollTarget = document.getElementById("url");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth" }); 
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setSeoData(null);
    }
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-0">
        <div className="flex flex-col items-center px-6 py-0 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl mt-20 font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="/fss.svg" alt="logo" />
            Growthfyi
          </a>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Get an SEO report:
          </h1>
          <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-base rounded-lg text-center focus:ring-primary-600 focus:border-primary-600 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Paste your link here"
                    required
                  />
                  <button
                    type="button"
                    className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handleClick}
                  >
                    Get Results
                  </button>
                </div>
              </form>
            </div>
          </div>
      <div className="flex flex-col items-center px-0 py-0 mx-auto ">
        {!seoData  && (
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white" id="scrollTarget">
            LOADING....
          </h1>
        )}
        {seoData && (
          <div className="mt-4 max-w-4xl">
            <h2 className="text-2xl font-semibold text-white">
              SEO Report:
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 mt-0 text-white">
              {JSON.stringify(seoData, null, 2)}
            </pre>
          </div>
        )}
      </div>
        </div>
      </section>
    </div>
  );

}
