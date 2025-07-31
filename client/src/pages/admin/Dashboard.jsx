import React from "react";

const users = [
  {
    id: 1,
    name: "John Doe svcndsbvkj dvksbvkd vjds vnds vnsd vj ",
    email: "john@example.com",
    role: "Developer",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith jcbaecbiadbhsckadjbvjhdbjds",
    email: "jane@example.com",
    role: "Designer",
    status: "Active",
    joinDate: "2022-11-22",
  },
  {
    id: 3,
    name: "Bob Johnson ckjdbhbcihbcijwqvuhkj v",
    email: "bob@example.com",
    role: "Manager",
    status: "Inactive",
    joinDate: "2021-05-30",
  },
  {
    id: 4,
    name: "Alice Brown ckasjgvcjascvihdscsakc jdv ",
    email: "alice@example.com",
    role: "Developer",
    status: "Active",
    joinDate: "2023-02-10",
  },
  {
    id: 5,
    name: "Charlie Wilson cskjcbgqebckjjbchacjndv",
    email: "charlie@example.com",
    role: "QA Engineer",
    status: "Active",
    joinDate: "2022-07-18",
  },
  {
    id: 6,
    name: "Diana Davis kncibcscoasjbvihbncoec",
    email: "diana@example.com",
    role: "Product Owner",
    status: "Active",
    joinDate: "2021-09-05",
  },
  {
    id: 7,
    name: "Edward Miller c jhcbiejbcokiabckndv jhabciqXNKN JB",
    email: "edward@example.com",
    role: "DevOps Engineer",
    status: "Inactive",
    joinDate: "2023-03-21",
  },
];
const Dashboard = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          User Management
        </h1>

        {/* Responsive container with horizontal scrolling on mobile */}
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
          {/* Table with fixed layout to improve performance on large datasets */}
          <table className="divide-y divide-gray-200  w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${
                                                  user.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile hint (only visible on small screens) */}
        <div className="md:hidden mt-4 text-sm text-gray-500 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          Scroll horizontally to view all columns
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
