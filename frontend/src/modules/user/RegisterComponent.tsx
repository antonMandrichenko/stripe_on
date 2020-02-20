import React, { useState, ReactElement } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Register, RegisterVariables } from "./types/Register";
import { RouteComponentProps } from "react-router-dom";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

interface Props {
 route: RouteComponentProps
}

export default function RegisterComponent(props: RouteComponentProps<{}>): ReactElement {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [register, { data }] = useMutation<Register, RegisterVariables>(REGISTER);

  const { email, password } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ variables: state });
    props.history.push("/login")
    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px"
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter email..."
            value={email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
