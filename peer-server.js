const { PeerServer } = require("peer");

const port = process.env.PORT || 9000;

const server = PeerServer({
  port: port,
  path: "/myapp", // المسار ده هنستخدمه في الكود
});

console.log(`PeerJS server running on port ${port}`);

