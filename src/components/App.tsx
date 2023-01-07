import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between font-sans">
      <header className="sticky flex w-full bg-gradient-to-b from-red-500 to-red-800 px-8 py-4 text-white ">
        <a href="/" className="">
          Frutería MaryCarmen
        </a>
        <NavBar />
      </header>
      <body>
        <p>My Body</p>
      </body>
      <footer>
        <p>My Footer</p>
      </footer>
    </div>
  );
};

export default App;
