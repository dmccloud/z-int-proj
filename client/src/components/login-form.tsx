import React, { Component } from "react";
import Button from "./button";

interface LoginFormProps {
  login: (a: { variables: any }) => void;
}

interface LoginFormState {
  email: string;
}

export default class LoginForm extends Component<
  LoginFormProps,
  LoginFormState
> {
  state = { email: "" };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = (event.target as HTMLInputElement).value;
    this.setState((s) => ({ email }));
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email } });
  };

  render() {
    return (
      <div className="flex flex-col items-center grow text-white bg-sky-800">
        <h1 className="mx-auto">Utah Events</h1>
        <form
          className="max-w-406 w-full p-2 rounded shadow-md shadow-black text-stone-800 bg-white"
          onSubmit={(e: any) => this.onSubmit(e)}
        >
          <input
            className="w-full mb-4 px-auto border border-slate-800 text-base hover:border-cyan-800"
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={(e: any) => this.onChange(e)}
          />
          <Button type="submit">Log in</Button>
        </form>
      </div>
    );
  }
}
