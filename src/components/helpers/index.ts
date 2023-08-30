import axios from "axios";

export const imgResize = (src: string, size: { w: number; h: number }) => {
  if (size !== undefined) {
    return `${src
      ?.replace("cf-images.us-east-1.prod.boltdns.net", "https://atd.imgix.net")
      .replace(
        "http://files.astd.org.s3.amazonaws.com",
        "https://atd-s3.imgix.net"
      )
      .replace(
        "https://atd-brightspot-lower.s3.amazonaws.com",
        "https://atd-brightspot-lower.imgix.net"
      )}?w=${size.w}&h=${size.h}&fit=crop`;
  }

  return src
    ?.replace("cf-images.us-east-1.prod.boltdns.net", "https://atd.imgix.net")
    .replace(
      "http://files.astd.org.s3.amazonaws.com",
      "https://atd-s3.imgix.net"
    )
    .replace(
      "https://atd-brightspot-lower.s3.amazonaws.com",
      "https://atd-brightspot-lower.imgix.net"
      //)}?${resize}&fit=crop`
    );
};

export const autofill = (video: any, version: any, sdk: any) => {
  if (video.state === "ACTIVE") {
    axios
      .put(
        `https://api.contentful.com/spaces/${sdk.ids["space"]}/environments/${sdk.ids["environment"]}/entries/${sdk.ids["entry"]}`,
        {
          fields: {
            title: {
              "en-US": video.name || "",
            },
            slug: {
              "en-US":
                `video/${video.name.replace(/\s+/g, "-").toLowerCase()}` || "",
            },
            body: {
              "en-US": {
                content: [
                  {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                      {
                        value: video.long_description || "",
                        nodeType: "text",
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                ],
                data: {},
                nodeType: "document",
              },
            },
            description: {
              "en-US": {
                content: [
                  {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                      {
                        value: video.description || "",
                        nodeType: "text",
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                ],
                data: {},
                nodeType: "document",
              },
            },
            metaKeywords: {
              "en-US": video.tags || "",
            },
            metaDescription: {
              "en-US": video.description || "",
            },
            metaTitle: {
              "en-US": video.name || "",
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CMA_TOKEN}`,
            "Content-Type": "application/vnd.contentful.management.v1+json",
            "X-Contentful-Content-Type": sdk.ids["contentType"],
            "X-Contentful-Version": version,
          },
        }
      )
      .then((res) => console.log("AUTO FILL", res.status))
      .catch((err) => console.log(err));
    sdk.close(video);
  }
};
