export function getFileUploadContentType(type) {
  switch (type) {
    case "image/svg+xml":
      return "image/svg%2Bxml";
    default:
      return type;
  }
}
