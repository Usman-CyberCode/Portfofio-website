import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 13,
          background: "#08080a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff7a18",
          borderRadius: 7,
          border: "1.5px solid rgba(255, 122, 24, 0.5)",
          fontWeight: 900,
          letterSpacing: "-0.5px",
        }}
      >
        MTU
      </div>
    ),
    {
      ...size,
    }
  );
}
