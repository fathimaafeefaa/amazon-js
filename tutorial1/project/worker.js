self.onmessage = function (event) {
  const num = event.data;
  let sum = 0;

  for (let i = 0; i < num; i++) {
    sum += i;
  }

  self.postMessage(sum);
};
