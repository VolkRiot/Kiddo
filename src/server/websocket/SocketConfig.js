module.exports = websocket => {
  websocket.on('connection', socket => {
    // eslint-disable-next-line no-console
    console.log('A client just connected with id ', socket.id);
  });
};
