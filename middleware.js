export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/add-content",
    "/add-announcement",
    "/manage-news",
    "/manage-tips",
    "/manage-announcement",
    "/account-settings",
  ],
};
