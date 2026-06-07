declare namespace process {
  export const env: {
    SITE_URL?: string;
    BETTER_AUTH_SECRET?: string;
    [key: string]: string | undefined;
  };
}
