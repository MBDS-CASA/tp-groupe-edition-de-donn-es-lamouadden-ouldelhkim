import React from "react";

const MainContent = () => {
  const now = new Date();
  const day = now.toLocaleString("fr-FR", { weekday: "long" }); // e.g., lundi
  const month = now.toLocaleString("fr-FR", { month: "long" }); // e.g., janvier
  const date = now.getDate();
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return (
    <h3>
      Bonjour, on est le {day}, {date} {month}, {year} et il est {hour}:{minute}
      :{second}
    </h3>
  );
};

export default MainContent;
