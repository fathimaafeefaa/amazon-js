import { get } from "@vueuse/core";

const data = {
  users: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 34,
      isActive: true,
      createdAt: "2026-01-01T09:00:00Z",
      subUsers: [],
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      age: 41,
      isActive: true,
      createdAt: "2026-01-02T10:00:00Z",
      subUsers: [
        {
          id: 201,
          firstName: "Bob",
          lastName: "Smith",
          email: "bob.smith@example.com",
          age: 29,
          role: "Admin",
          isActive: true,
          createdAt: "2026-02-01T08:00:00Z",
        },
      ],
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      age: 27,
      isActive: false,
      createdAt: "2026-01-03T11:00:00Z",
      subUsers: [
        {
          id: 301,
          firstName: "Sara",
          lastName: "Brown",
          email: "sara.brown@example.com",
          age: 24,
          role: "Editor",
          isActive: true,
          createdAt: "2026-02-02T09:00:00Z",
        },
        {
          id: 302,
          firstName: "Tom",
          lastName: "Brown",
          email: "tom.brown@example.com",
          age: 22,
          role: "Viewer",
          isActive: false,
          createdAt: "2026-02-03T10:00:00Z",
        },
      ],
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.johnson@example.com",
      age: 36,
      isActive: true,
      createdAt: "2026-01-04T12:00:00Z",
      subUsers: [],
    },
    {
      id: 5,
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@example.com",
      age: 45,
      isActive: true,
      createdAt: "2026-01-05T13:00:00Z",
      subUsers: [
        {
          id: 501,
          firstName: "Laura",
          lastName: "Wilson",
          email: "laura.wilson@example.com",
          age: 33,
          role: "Manager",
          isActive: true,
          createdAt: "2026-02-04T11:00:00Z",
        },
        {
          id: 502,
          firstName: "Chris",
          lastName: "Wilson",
          email: "chris.wilson@example.com",
          age: 30,
          role: "Editor",
          isActive: true,
          createdAt: "2026-02-05T12:00:00Z",
        },
        {
          id: 503,
          firstName: "Anna",
          lastName: "Wilson",
          email: "anna.wilson@example.com",
          age: 27,
          role: "Viewer",
          isActive: false,
          createdAt: "2026-02-06T13:00:00Z",
        },
      ],
    },
    {
      id: 6,
      firstName: "Sophia",
      lastName: "Martinez",
      email: "sophia.martinez@example.com",
      age: 31,
      isActive: false,
      createdAt: "2026-01-06T14:00:00Z",
      subUsers: [],
    },
    {
      id: 7,
      firstName: "Daniel",
      lastName: "Anderson",
      email: "daniel.anderson@example.com",
      age: 39,
      isActive: true,
      createdAt: "2026-01-07T15:00:00Z",
      subUsers: [
        {
          id: 701,
          firstName: "Grace",
          lastName: "Anderson",
          email: "grace.anderson@example.com",
          age: 26,
          role: "Editor",
          isActive: true,
          createdAt: "2026-02-07T09:30:00Z",
        },
      ],
    },
    {
      id: 8,
      firstName: "Olivia",
      lastName: "Thomas",
      email: "olivia.thomas@example.com",
      age: 28,
      isActive: true,
      createdAt: "2026-01-08T16:00:00Z",
      subUsers: [
        {
          id: 801,
          firstName: "Ethan",
          lastName: "Thomas",
          email: "ethan.thomas@example.com",
          age: 23,
          role: "Viewer",
          isActive: true,
          createdAt: "2026-02-08T10:00:00Z",
        },
        {
          id: 802,
          firstName: "Mia",
          lastName: "Thomas",
          email: "mia.thomas@example.com",
          age: 21,
          role: "Editor",
          isActive: true,
          createdAt: "2026-02-09T11:00:00Z",
        },
      ],
    },
    {
      id: 9,
      firstName: "James",
      lastName: "Taylor",
      email: "james.taylor@example.com",
      age: 50,
      isActive: false,
      createdAt: "2026-01-09T17:00:00Z",
      subUsers: [],
    },
    {
      id: 10,
      firstName: "Isabella",
      lastName: "Moore",
      email: "isabella.moore@example.com",
      age: 37,
      isActive: true,
      createdAt: "2026-01-10T18:00:00Z",
      subUsers: [
        {
          id: 1001,
          firstName: "Liam",
          lastName: "Moore",
          email: "liam.moore@example.com",
          age: 32,
          role: "Admin",
          isActive: true,
          createdAt: "2026-02-10T12:00:00Z",
        },
        {
          id: 1002,
          firstName: "Noah",
          lastName: "Moore",
          email: "noah.moore@example.com",
          age: 29,
          role: "Editor",
          isActive: false,
          createdAt: "2026-02-11T13:00:00Z",
        },
        {
          id: 1003,
          firstName: "Ava",
          lastName: "Moore",
          email: "ava.moore@example.com",
          age: 25,
          role: "Viewer",
          isActive: true,
          createdAt: "2026-02-12T14:00:00Z",
        },
        {
          id: 1004,
          firstName: "Lucas",
          lastName: "Moore",
          email: "lucas.moore@example.com",
          age: 24,
          role: "Viewer",
          isActive: true,
          createdAt: "2026-02-13T15:00:00Z",
        },
      ],
    },
  ],
};


function getActiveUser(users) {
  const activeUser = users.filter((users) => users.isActive === true);
  return activeUser;
}

console.log(getActiveUser(data.users));
console.log("hello");

function noSubUsers(users) {
  const subUser = users.filter((users) => users.subUsers.length === 0);
  return subUser;
}
console.log(noSubUsers(data.users));

console.log("user email");

function userEmail(users) {
  const email = users.map((users) => users.email);
  return email;
}
console.log(userEmail(data.users));

console.log("user Id");

function userId(users) {
  const id = users.find((users) => users.id === 5);
  return id;
}
console.log(userId(data.users));

console.log("inActive");

function inActiveUsers(users) {
  const inactive = users.filter((users) => users.isActive === false);
  return inactive;
}
console.log(inActiveUsers(data.users));

console.log("subUsersInactive");
function isSubUserActive(users) {
  const allSubUser = users.flatMap((users) => users.subUsers);
  const subUserActive = allSubUser.filter((subUsers) => subUsers.isActive);
  return subUserActive;
}
console.log(isSubUserActive(data.users));

console.log("Total SubUser");
function subUserNumber(users) {
  return users.flatMap((users) => users.subUsers).length;
}
console.log(subUserNumber(data.users));

console.log("subUsers");
function totalSubUsers(users) {
  return users.flatMap((users) => users.subUsers);
}
console.log(totalSubUsers(data.users));

function specificUser(users) {
  const user = users.find((users) => users.id === 2);
  if (!user) return false;
  return user.subUsers.some((subUsers) => subUsers.isActive);
}
console.log(specificUser(data.users));

console.log("most Sub User");
function mostSubUser(users) {
  let maxUsers = users[0];
  for (let i = 1; i < users.length; i++) {
    if (users[i].subUsers.length > maxUsers.subUsers.length) {
      maxUsers = users[i];
    }
  }
  return maxUsers;
}
console.log(mostSubUser(data.users));


function wsubuser(users){
    let maxUsers = users[0];
   users.forEach(users => {
    if (users.subUsers.length > maxUsers.subUsers.length) {
      maxUsers = users;
    }
    
   });
    return maxUsers;

}
console.log(wsubuser(data.users));

console.log("atleast 5 users");

function atleastFive(users) {
  return users.filter((users) => users.subUsers.length >= 4);
}
console.log(atleastFive(data.users));

function inactiveusers(users) {
  const subuser = users.map((users) => users.subUsers);
  return subuser.filter((subuser) => subuser.isActive === false).length;
}
console.log(inactiveusers(data.users));

function averageAge(users) {
  const ages = users.flatMap((users) => users.age);
  const totalAge = ages.reduce((sum, age) => sum + age, 0);
  return totalAge / ages.length;
}
console.log(averageAge(data.users));

function averagesubAge(users) {
  const subusers = users.flatMap((users) => users.subUsers);
  const ages = subusers.flatMap((subuser) => subuser.age);
  const totalAge = ages.reduce((sum, age) => sum + age, 0);
  return totalAge / ages.length;
}
console.log(averagesubAge(data.users));



function usersoneActive(users){
return  users.filter((user=>user.subUsers.some(user=>user.isActive)))
}
console.log(usersoneActive(data.users))

function usersWithOneActiveSub(users) {
  return users.filter((user => user.subUsers.some(sub => sub.isActive)));
}

console.log(usersWithOneActiveSub(data.users))