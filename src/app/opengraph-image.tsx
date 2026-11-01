import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";

export const alt = `${profile.name} | ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Multi-tenant SaaS", "Stripe", "AI integrations", "Node.js"];

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/abdul-moeez.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: 72,
          background: "#040409",
          backgroundImage:
            "radial-gradient(circle at 85% 30%, rgba(69,227,255,0.35), transparent 40%), radial-gradient(circle at 70% 80%, rgba(139,123,255,0.45), transparent 45%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #8b7bff, #45e3ff)",
                color: "#040409",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              AM
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: "#c4ff61" }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: "#c4ff61" }} />
              {profile.currentRole}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -5, lineHeight: 0.95 }}>{profile.name}</div>
            <div style={{ marginTop: 18, fontSize: 40, color: "#c9c2ff" }}>{profile.role}</div>
            <div style={{ marginTop: 10, fontSize: 26, lineHeight: 1.3, color: "rgba(255,255,255,0.7)" }}>
              Building multi-tenant SaaS, payments and AI integrations.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.05)",
                  fontSize: 24,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Head-and-shoulders crop: oversized image offset inside a clipped frame */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 340,
            height: 453,
            overflow: "hidden",
            borderRadius: 36,
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 30px 80px rgba(139,123,255,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={560}
            height={747}
            style={{ position: "absolute", left: -82, top: -125, width: 560, height: 747 }}
          />
        </div>
      </div>
    ),
    size,
  );
}
