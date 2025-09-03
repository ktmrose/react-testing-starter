import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />);
    const paragraph = screen.getByText(/no users/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("should render the list of users", () => {
    const users: User[] = [
      { id: 1, name: "Mosh" },
      { id: 2, name: "John" },
    ];

    render(<UserList users={users} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(users.length);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
