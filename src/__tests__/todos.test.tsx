import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { BrowserRouter, MemoryRouter } from "react-router";
import Todos from "../components/todos/Todos";

describe.skip("Todos", () => {
    const mockTodos = [
        {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
        },
        {
            userId: 1,
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: false,
        },
    ];

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

        // Assert
        expect(todoTitle1).toBeInTheDocument();
        expect(todoTitle2).toBeInTheDocument();
    })
});