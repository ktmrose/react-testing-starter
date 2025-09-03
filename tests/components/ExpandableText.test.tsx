import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text if less than 255 characters", () => {
    const text = "Hello World";
    render(<ExpandableText text={text} />);
    const article = screen.getByText(text);
    expect(article).toBeInTheDocument();
  });

  it("should render the text", () => {
    render(<ExpandableText text={longText} />);
    const truncArticle = screen.getByText(truncatedText);
    expect(truncArticle).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand the text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    await button.click();
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse the text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    await showMoreButton.click();
    await showMoreButton.click();

    const showLessButton = screen.getByRole("button", { name: /more/i });
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toHaveTextContent(/more/i);
  });
});
