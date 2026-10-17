import { DurableObject } from "cloudflare:workers";

export class App extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ status: "ok", app: "Liquid Glass v2.6" });
    }
    return new Response("Not found", { status: 404 });
  }
}
