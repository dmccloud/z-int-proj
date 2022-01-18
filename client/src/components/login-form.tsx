import React, { Component } from "react";
// import Button from "./button";

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
      <div className="flex flex-col items-center grow text-white bg-slate-800 m-auto h-screen">
        <h1 className="mt-auto ">Event Finder</h1>
        <form
          className="p-10 w-70 flex flex-col items-center mb-auto rounded bg-white text-black shadow-md shadow-blue border-stone-800 hover:border-sky-900"
          onSubmit={(e) => this.onSubmit(e)}
        >
          <input
            className="w-full border-2 mt-0 p-1.5 mb-6"
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={(e) => this.onChange(e)}
          />
          <button
            className=" mb-5 h-10 px-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}
