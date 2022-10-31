import garlandBackground from "./assets/garland.jpg";

export function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${garlandBackground})`,
        backgroundSize: "100vw",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgb(238,238,238)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1d1d1d",
          padding: "200px 20px",
          fontFamily: "serif",
        }}
      >
        Vienna Christmas Markets
      </h1>
    </div>
  );
}
