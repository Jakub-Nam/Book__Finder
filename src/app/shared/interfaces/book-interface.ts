
export interface Book {
  accessInfo: object;
  etag: string;
  id: string;
  saleInfo: object;
  searchInfo: { textsnippet: string };
  selfLink: string;
  volumeInfo: {
    imageLinks: { smallThumbnail: string, thumbnail: string };
    title: string;
  };
}
