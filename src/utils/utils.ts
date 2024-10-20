export function getPageNumber(url: string) {
  const parsedUrl = new URL(url);
  const page = parsedUrl.searchParams.get('page');
  return page ? parseInt(page, 10) : 1;
}

export function getIdFromUrl(url: string): string {
  const parsedUrl = new URL(url);
  const segments = parsedUrl.pathname.split('/');
  const id = segments[segments.length - 2];
  return id;
}

export const getToken = () => {
  return sessionStorage.getItem('token');
};
