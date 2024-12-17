import App from "./App";
import Profile from "./Profile";
import Message1 from "./Message1"
import Message2 from "./Message2"
import Messages from "./Messages";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "messages",
    element: <Messages />,
  },
  {
    path: "message1",
    element: <Message1 />,
  },
  {
    path: "message2",
    element: <Message2 />,
  },
];

export default routes;
