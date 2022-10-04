export const imgResize = (src, size) => {
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
