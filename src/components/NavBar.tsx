import React from "react";

function NavBar() {
  return (
    <div className="m-auto">
      <ul className="flex gap-10">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/frutas">Frutas</a>
        </li>
        <li>
          <a href="/verduras">Verduras</a>
        </li>
        <li>
          <a href="/hortalizas">Hortalizas</a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
