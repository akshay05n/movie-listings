import React from "react";
import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./stores";

describe("App", () => {
  it("renders the navbar", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the initial set of movies", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    const movies = screen.getAllByRole("presentation");
    expect(movies).toHaveLength(20);
  });

  it("loads more movies when scrolled to the bottom of the page if not searching", async () => {
    const getById = queryByAttribute.bind(null, "id");
    const view = render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    const initialMovies = screen.getAllByRole("presentation");
    // Scroll to the bottom of the page
    const scrollArea = getById(view.container, "scrollTarget");
    fireEvent.scroll(scrollArea, {
      target: { scrollY: 10000 },
    });
    // Wait for the other components to load - this can be commented
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newMovies = screen.getAllByRole("presentation");
    expect(newMovies).toHaveLength(initialMovies.length + 20);
  });

  it("searches for movies when the search button is clicked", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);

    const searchInput = screen.getByRole("search");
    expect(searchInput).toBeInTheDocument();

    expect(searchInput.value).toBe("");
    const initialMovies = screen.getAllByRole("presentation");
    expect(initialMovies).toHaveLength(20);

    fireEvent.change(searchInput, { target: { value: "birds" } });
    expect(searchInput.value).toBe("birds");
    const updatedMovies = screen.getAllByRole("presentation");
    expect(updatedMovies).toHaveLength(8);
  });

  it("should not loads more movies when scrolled to the bottom of the page if searching", () => {
    const getById = queryByAttribute.bind(null, "id");
    const view = render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);

    const initialMoviesCount = screen.getAllByRole("presentation").length;
    // Scroll to the bottom of the page
    const scrollArea = getById(view.container, "scrollTarget");
    fireEvent.scroll(scrollArea, {
      target: { scrollY: 10000 },
    });
    const newMoviesCount = screen.getAllByRole("presentation").length;
    expect(newMoviesCount).toBe(initialMoviesCount);
  });

  it("reverts search results when clicking the back button", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);

    const searchInput = screen.getByRole("search");
    expect(searchInput).toBeInTheDocument();

    expect(searchInput.value).toBe("");
    const initialMovies = screen.getAllByRole("presentation");
    expect(initialMovies).toHaveLength(20);

    fireEvent.change(searchInput, { target: { value: "birds" } });
    expect(searchInput.value).toBe("birds");
    const updatedMovies = screen.getAllByRole("presentation");
    expect(updatedMovies).toHaveLength(8);

    const backButton = screen.getByAltText("back");
    fireEvent.click(backButton);
    const revertedMovies = screen.getAllByRole("presentation");
    expect(revertedMovies).toHaveLength(20);
  });

  it("should render the search input box when clicking the search button", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    const searchButton = screen.getByAltText("search");
    let searchInput = screen.queryByRole("search");
    expect(searchInput).not.toBeInTheDocument();
    fireEvent.click(searchButton);
    searchInput = screen.getByRole("search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should hide the search input box when clicking the back button", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);
    const searchInput = screen.getByRole("search");
    expect(searchInput).toBeInTheDocument();
    const backButton = screen.getByAltText("back");
    fireEvent.click(backButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
