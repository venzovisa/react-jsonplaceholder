import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../App";
import { BrowserRouter } from "react-router";
import Home from "../components/home/Home";
import userEvent from "@testing-library/user-event";

describe("Users", () => {
  const mockUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  }

  test('should render user data', async () => {
    // Arrange


    // Act
    renderWithProviders(
      <BrowserRouter >
        <App />
      </BrowserRouter>
    );

    // Assert
    const homeTab = await screen.findByText('Home');
    const tasksTab = await screen.findByText('Tasks');
    const name = await screen.findAllByText(mockUser.name);
    const username = await screen.findByText(`@${mockUser.username}`);
    const email = await screen.findByText(mockUser.email);
    const phone = await screen.findByText(mockUser.phone);
    const website = await screen.findByText(mockUser.website);
    const suiteAndStreet = await screen.findByText(`${mockUser.address.suite}, ${mockUser.address.street}`);
    const cityAndZipcode = await screen.findByText(`${mockUser.address.city}, ${mockUser.address.zipcode}`);
    const latAndLng = await screen.findByText(`${mockUser.address.geo.lat}, ${mockUser.address.geo.lng}`);
    const companyName = await screen.findByText(mockUser.company.name);
    const catchPhrase = await screen.findByText(mockUser.company.catchPhrase);
    const companyBs = await screen.findByText(mockUser.company.bs);
    const editProfileButton = await screen.findByText('Edit profile');
    const postsButton = await screen.findByTestId('posts-button');

    expect(homeTab).toBeInTheDocument();
    expect(tasksTab).toBeInTheDocument();
    expect(name[0]).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(website).toBeInTheDocument();
    expect(suiteAndStreet).toBeInTheDocument();
    expect(cityAndZipcode).toBeInTheDocument();
    expect(latAndLng).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
    expect(catchPhrase).toBeInTheDocument();
    expect(companyBs).toBeInTheDocument();
    expect(editProfileButton).toBeInTheDocument();
    expect(postsButton).toBeInTheDocument();
  });

  test('should render profile edit form', async () => {
    // Arrange
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Act
    const editProfileButton = await screen.findAllByTestId('edit-profile-button');
    const user = userEvent.setup();
    await user.click(editProfileButton[0]);

    // Arrange
    expect((await screen.findAllByText(mockUser.name))[0]).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Bret/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Sincere@april.biz/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.website)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.suite)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.street)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.zipcode)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.geo.lat)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.geo.lng)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.company.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.company.catchPhrase)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.company.bs)).toBeInTheDocument();
    expect(await screen.findByTestId("save-button")).toBeInTheDocument();
  })

  test('should revert any changes made to the fields', async () => {
    // Arrange
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    // Act
    const editProfileButton = await screen.findAllByTestId('edit-profile-button');
    await user.click(editProfileButton[0]);
    await user.clear(screen.getByDisplayValue('Bret'));
    await user.clear(screen.getByDisplayValue(/Sincere@april.biz/i));
    await user.clear(screen.getByDisplayValue(mockUser.phone));
    await user.clear(screen.getByDisplayValue(mockUser.website));
    await user.clear(screen.getByDisplayValue(mockUser.address.suite));
    await user.clear(screen.getByDisplayValue(mockUser.address.street));
    await user.clear(screen.getByDisplayValue(mockUser.address.city));
    await user.clear(screen.getByDisplayValue(mockUser.address.zipcode));
    await user.clear(screen.getByDisplayValue(mockUser.address.geo.lat));
    await user.clear(screen.getByDisplayValue(mockUser.address.geo.lng));
    await user.clear(screen.getByDisplayValue(mockUser.company.name));
    await user.clear(screen.getByDisplayValue(mockUser.company.catchPhrase));
    await user.clear(screen.getByDisplayValue(mockUser.company.bs));

    const revertButton = await screen.findByTestId("revert-button");
    await user.click(revertButton);

    // Assert
    expect(screen.getByDisplayValue('Bret')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Sincere@april.biz/i));
    expect(screen.getByDisplayValue(mockUser.phone));
    expect(screen.getByDisplayValue(mockUser.website));
    expect(screen.getByDisplayValue(mockUser.address.suite));
    expect(screen.getByDisplayValue(mockUser.address.street));
    expect(screen.getByDisplayValue(mockUser.address.city));
    expect(screen.getByDisplayValue(mockUser.address.zipcode));
    expect(screen.getByDisplayValue(mockUser.address.geo.lat));
    expect(screen.getByDisplayValue(mockUser.address.geo.lng));
    expect(screen.getByDisplayValue(mockUser.company.name));
    expect(screen.getByDisplayValue(mockUser.company.catchPhrase));
    expect(screen.getByDisplayValue(mockUser.company.bs));
  })

  test('should not save an empty form', async () => {
    // Arrange
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    // Act
    const editProfileButton = await screen.findAllByTestId('edit-profile-button');
    await user.click(editProfileButton[0]);
    await user.clear(screen.getByDisplayValue('Bret'));
    await user.clear(screen.getByDisplayValue(/Sincere@april.biz/i));
    await user.clear(screen.getByDisplayValue(mockUser.phone));
    await user.clear(screen.getByDisplayValue(mockUser.website));
    await user.clear(screen.getByDisplayValue(mockUser.address.suite));
    await user.clear(screen.getByDisplayValue(mockUser.address.street));
    await user.clear(screen.getByDisplayValue(mockUser.address.city));
    await user.clear(screen.getByDisplayValue(mockUser.address.zipcode));
    await user.clear(screen.getByDisplayValue(mockUser.address.geo.lat));
    await user.clear(screen.getByDisplayValue(mockUser.address.geo.lng));
    await user.clear(screen.getByDisplayValue(mockUser.company.name));
    await user.clear(screen.getByDisplayValue(mockUser.company.catchPhrase));
    await user.clear(screen.getByDisplayValue(mockUser.company.bs));
    await user.click(await screen.findByTestId("save-button"));

    // Assert
    expect(await screen.findByTestId("revert-button")).toBeInTheDocument();
    expect(await screen.findByTestId("cancel-button")).toBeInTheDocument();
  })

  test('should save filled form', async () => {
    // Arrange
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    // Act
    const editProfileButton = await screen.findAllByTestId('edit-profile-button');
    await user.click(editProfileButton[0]);
    await user.click(await screen.findByTestId("save-button"));

    // Assert
    expect(await screen.findByTestId("edit-profile-button")).toBeInTheDocument();
    expect(await screen.findByTestId("posts-button")).toBeInTheDocument();
  })
});