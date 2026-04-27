import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title    = searchParams.get("title")    || "Dawn Phase";
  const subtitle = searchParams.get("subtitle") || "Privacy-first cycle tracker";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FDF6F0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        {/* Top: logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.dawnphase.com/logo.png"
            width="48"
            height="48"
            style={{ borderRadius: "12px" }}
            alt="Dawn Phase"
          />
          <span style={{ color: "#C94B6D", fontSize: "28px", fontWeight: "600" }}>
            Dawn Phase
          </span>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#C94B6D",
              fontSize: "52px",
              fontWeight: "700",
              lineHeight: "1.2",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div style={{ color: "#8C6B5A", fontSize: "28px", maxWidth: "800px" }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom: url + badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#8C6B5A", fontSize: "22px" }}>
            dawnphase.com
          </span>
          <div
            style={{
              background: "#FBEAF0",
              border: "1px solid #E8637A",
              borderRadius: "20px",
              padding: "8px 20px",
              color: "#C94B6D",
              fontSize: "20px",
            }}
          >
            Privacy-first · No data selling
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
