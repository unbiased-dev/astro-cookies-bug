import type { APIRoute } from "astro";
import cookie from "cookie";
import qs from "query-string";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const cookieName = formData.get("cookieName") as string;
  const cookieValue = formData.get("cookieValue") as string;

  const newCookie = cookie.serialize(cookieName, cookieValue, {
    httpOnly: true,
    domain: "/",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/?${qs.stringify({ cookie: newCookie })}`,
      "Set-Cookie": newCookie,
    },
  });
};
