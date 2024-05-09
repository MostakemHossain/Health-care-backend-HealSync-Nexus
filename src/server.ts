import app from "./app";

const port = 4000;
async function main() {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
main();
