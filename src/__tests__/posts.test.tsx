import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Posts from "../components/posts/Posts";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { mockPosts } from "../mocks/mocks";

describe("Posts", () => {
    test('should render user posts', async () => {
        // Arrange
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/1"]}>
                <Posts />
            </MemoryRouter>
        );

        // Act
        const postTitle1 = await screen.findByText(mockPosts[0].title);
        const postBody1 = await screen.findByText(mockPosts[0].body);
        const postTitle2 = await screen.findByText(mockPosts[1].title);
        const postBody2 = await screen.findByText(mockPosts[1].body);

        // Assert
        expect(postTitle1).toBeInTheDocument();
        expect(postBody1).toBeInTheDocument();
        expect(postTitle2).toBeInTheDocument();
        expect(postBody2).toBeInTheDocument();
    });

    test('should open post edit form', async () => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(
            <MemoryRouter initialEntries={["/posts/1"]}>
                <Posts />
            </MemoryRouter>
        );

        // Act
        await user.click((await screen.findAllByTestId('post-edit-button'))[0]);

        // Assert
        const title = await screen.findByDisplayValue(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i);
        const body = await screen.findByDisplayValue(/quia et suscipit suscipit recusandae/i);
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
        expect(await screen.findByTestId('post-save-button')).toBeInTheDocument();
        expect(await screen.findByTestId('post-revert-button')).toBeInTheDocument();
        expect(await screen.findByTestId('post-cancel-button')).toBeInTheDocument();
    });

    test('should not save an empty edit form', async () => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(
            <MemoryRouter initialEntries={["/posts/1"]}>
                <Posts />
            </MemoryRouter>
        );

        // Act
        await user.click((await screen.findAllByTestId('post-edit-button'))[0]);
        await user.clear(await screen.findByDisplayValue(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i));
        await user.clear(await screen.findByDisplayValue(/quia et suscipit suscipit recusandae/i));
        await user.click(await screen.findByTestId('post-save-button'));

        // Assert
        expect(await screen.findByTestId('post-revert-button')).toBeInTheDocument();
        expect(await screen.findByTestId('post-cancel-button')).toBeInTheDocument();
    });

    test('should revert empty form', async () => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(
            <MemoryRouter initialEntries={["/posts/1"]}>
                <Posts />
            </MemoryRouter>
        );

        // Act
        await user.click((await screen.findAllByTestId('post-edit-button'))[0]);
        await user.clear(await screen.findByDisplayValue(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i));
        await user.clear(await screen.findByDisplayValue(/quia et suscipit suscipit recusandae/i));
        await user.click(await screen.findByTestId('post-revert-button'));
        await user.click(await screen.findByTestId('post-save-button'));

        // Assert
        expect(await screen.findByText(mockPosts[0].title)).toBeInTheDocument();
        expect(await screen.findByText(mockPosts[0].body)).toBeInTheDocument();
    });

    test('should delete the first post', async () => {
        // Arrange
        const user = userEvent.setup();
        renderWithProviders(
            <MemoryRouter initialEntries={["/posts/1"]}>
                <Posts />
            </MemoryRouter>
        );

        // Act
        await user.click((await screen.findAllByTestId('post-delete-button'))[0]);
        await user.click(await screen.findByText(/OK/i));

        // Assert
        expect((await screen.findAllByText(mockPosts[1].title))[0]).toBeInTheDocument();
        expect((await screen.findAllByText(mockPosts[1].body))[0]).toBeInTheDocument();
    });
});