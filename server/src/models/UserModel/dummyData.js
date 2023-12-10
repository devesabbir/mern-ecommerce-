const usersData = [
    {
        name: "John Doe",
        userName: "john_doe123",
        email: "john.doe@example.com",
        phone: "1234567890",
        password: "password123", // Note: This will be hashed due to the set function in the schema
        image: "profile.jpg",
        address: "123 Main Street, City",
        isAdmin: false,
        isBanned: false,
      },
      {
        name: "Jane Smith",
        userName: "jane_smith456",
        email: "jane.smith@example.com",
        phone: "9876543210",
        password: "securePass",
        image: "avatar.png",
        address: "456 Oak Avenue, Town",
        isAdmin: true,
        isBanned: false,
      },
      // Add more objects to meet the minimum length requirement
      // Example:
      {
        name: "Alice Johnson",
        userName: "alice_123",
        email: "alice.j@example.com",
        phone: "5555555555",
        password: "pass123",
        image: "alice.jpg",
        address: "789 Elm Street, Village",
        isAdmin: false,
        isBanned: true,
      },
];


module.exports = {usersData}