import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render Edit button when user is admin", () => {
    render(<UserAccount user={{ id: 1, name: "Mosh", isAdmin: true }} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render Edit button when user is not admin", () => {
    render(<UserAccount user={{ id: 1, name: "Mosh" }} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("should render the user's name", () => {
    const user: User = { id: 1, name: "Mosh" };
    render(<UserAccount user={user} />);
    const divElement = screen.getByText(user.name, { exact: false });
    expect(divElement).toBeInTheDocument();
  });
});
