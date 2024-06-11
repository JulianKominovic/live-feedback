const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let msTook = 0;
const keepRenderServerAwaken = async () => {
  while (true) {
    msTook = 0;
    await snooze(1000 * 30); // 30 seconds
    console.log(new Date(), "Pinging Render server...");
    msTook = Date.now();
    await fetch("https://live-feedback.onrender.com/");
    msTook = Date.now() - msTook;
    console.log("Pinged Render server in", msTook, "ms.");
  }
};

keepRenderServerAwaken();
