// return video if it's video url formate , image ...
// warning currently only detecting common formats
export const videoORImage = (link: string) => {
  const response = link.match(/(mp4|jpg|png|jpeg|webp)/g);
  if (response) {
    switch (response[0]) {
      case "mp4":
        return "video";
      default:
        return "image";
    }
  } else {
    return null;
  }
};
