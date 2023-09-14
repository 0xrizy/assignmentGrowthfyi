import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function sendRequest(url:any, options:any) {
  return axios.get(url, options);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const url = await req.json();

  try {
    const postArray = [
      {
        target: url.url,
        max_crawl_pages: 10,
        load_resources: true,
        enable_browser_rendering: true,
        enable_javascript: true,
        custom_js: "meta = {}; meta.url = document.URL; meta;",
        tag: "some_string_123",
        pingback_url: "http://localhost:3000/",
      },
    ];

    const response = await axios.post(
      "https://api.dataforseo.com/v3/on_page/task_post",
      postArray,
      {
        auth: {
          username: process.env.DATAFORSEO_ID!,
          password: process.env.DATAFORSEO_PASS!,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.tasks[0].id;
    console.log(result);

    let status:any = 0;
    let summary = null;
    let startTime = Date.now();

    while (status !== 20000) {
      if (Date.now() - startTime >= 20000) {
        throw new Error("Timed out while waiting for status 2000");
      }

      const response2 = await sendRequest(
        "https://api.dataforseo.com/v3/on_page/summary/" + result,
        {
          auth: {
            username: process.env.DATAFORSEO_ID!,
            password: process.env.DATAFORSEO_PASS!,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      status = response2.data.tasks[0].status_code;
      
      summary = response2.data;
      console.log(response2.data);
      console.log(summary.status_code);
      console.log(summary.tasks[0].status_code);
      

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    return NextResponse.json({ summary, status });
  } catch (error:any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
