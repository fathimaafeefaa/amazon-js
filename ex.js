function walkDog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("you walk the dog");
    }, 500);
  });
}
function cleanKitchen() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("you clean the kitchen");
    }, 1500);
  });
}
function takeOutTheTrash() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("you take out the trash");
    }, 2500);
  });
}
// walkDog(()=>{
//   cleanKitchen(()=>{
//     takeOutTheTrash(()=>{

//     })
//   })
// })

walkDog()
  .then((value) => {
    console.log(value);
    return cleanKitchen();
  })
  .then((value) => {
    console.log(value);
    return takeOutTheTrash();
  })
  .then((value) => {
    console.log(value);
  });
