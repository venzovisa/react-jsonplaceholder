import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { BrowserRouter } from "react-router";
import Todos from "../components/todos/Todos";
import { mockTodos } from "../mocks/mocks";
import MatchMediaMock from 'vitest-matchmedia-mock';
import userEvent from "@testing-library/user-event";

describe("Todos", () => {
    const matchMediaMock = new MatchMediaMock();

    afterAll(() => {
        matchMediaMock.clear();
    });

    test('should render user todos', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const todoTitle1 = await screen.findByText(mockTodos[0].title);
        const todoTitle2 = await screen.findByText(mockTodos[1].title);
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).toBeChecked();

        // Assert
        expect(todoTitle1).toBeInTheDocument();
        expect(todoTitle2).toBeInTheDocument();
    });

    test('should sort by title ascending on click', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const checkboxes = await screen.findAllByRole('columnheader');
        await userEvent.click((checkboxes[1]));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        expect(todos[0].textContent === mockTodos[1].title).toEqual(true);
        expect(todos[1].textContent === mockTodos[2].title).toEqual(true);
        expect(todos[2].textContent === mockTodos[0].title).toEqual(true);
    });

    test('should sort by user id descending on double click', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const checkboxes = await screen.findAllByRole('columnheader');
        await userEvent.click((checkboxes[0]));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        expect(todos[0].textContent === mockTodos[2].title).toEqual(true);
        expect(todos[1].textContent === mockTodos[1].title).toEqual(true);
        expect(todos[2].textContent === mockTodos[0].title).toEqual(true);
    });

    test('should sort by user id ascending on click', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const checkboxes = await screen.findAllByRole('columnheader');
        await userEvent.click((checkboxes[0]));
        await userEvent.click((checkboxes[0]));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        expect(todos[0].textContent === mockTodos[0].title).toEqual(true);
        expect(todos[1].textContent === mockTodos[1].title).toEqual(true);
        expect(todos[2].textContent === mockTodos[2].title).toEqual(true);
    });

    test('should sort by completed status ascending on click', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const checkboxes = await screen.findAllByRole('columnheader');
        await userEvent.click((checkboxes[2]));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        console.log(todos[0].textContent, todos[1].textContent, todos[2].textContent);
        expect(todos[0].textContent === mockTodos[0].title).toEqual(true);
        expect(todos[1].textContent === mockTodos[1].title).toEqual(true);
        expect(todos[2].textContent === mockTodos[2].title).toEqual(true);
    });

    test('should sort by completed status descending on double click', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const checkboxes = await screen.findAllByRole('columnheader');
        await userEvent.click((checkboxes[2]));
        await userEvent.click((checkboxes[2]));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        console.log(todos[0].textContent, todos[1].textContent, todos[2].textContent);
        expect(todos[0].textContent === mockTodos[1].title).toEqual(true);
        expect(todos[1].textContent === mockTodos[2].title).toEqual(true);
        expect(todos[2].textContent === mockTodos[0].title).toEqual(true);
    });

    test('should search by user id on click button', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const searchField = await screen.findByRole('textbox');
        await userEvent.type(searchField, '2');
        await userEvent.click(await screen.findByTestId('todos-search-button'));

        // Assert
        const todos = await screen.findAllByText(/#mock-todos/i);
        expect(todos[0].textContent === mockTodos[1].title).toEqual(true);
    });

    test('should reset search results on click button', async () => {
        // Arrange
        renderWithProviders(
            <BrowserRouter>
                <Todos />
            </BrowserRouter>
        );

        // Act
        const searchField = await screen.findByRole('textbox');
        await userEvent.type(searchField, '3');
        await userEvent.click(await screen.findByTestId('todos-search-button'));
        expect((await screen.findAllByText(/#mock-todos/i)).length).toEqual(1);
        await userEvent.click(await screen.findByTestId('todos-reset-button'));

        // Assert
        const todosAfterReset = await screen.findAllByText(/#mock-todos/i);
        expect(todosAfterReset.length === mockTodos.length).toEqual(true);
    });
});