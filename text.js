// console.log("hello");

// const arr = [1, 2, 3, 4];
// const result = arr.reduce((acc, items) => {
//   return acc + items;
// });
// console.log(result);

const adminPath2 = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "CREATE_ADMIN",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: "CREATE_FACULTY",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "CREATE_STUDENT",
      },
    ],
  },
];

const newArray = adminPath2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.path,
      label: "Navlink",
    });
  }
  if (item.children) {
    // item.children.forEach((child) => {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "Navlink",
      })),
    });
    // });
  }
  return acc;
}, []);
// const newArray = adminPath2.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   //   acc.push(item);
//   return acc;
// }, []);
console.log(JSON.stringify(newArray));
