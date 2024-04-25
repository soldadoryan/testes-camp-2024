import React from "react";
import {
  userEvent,
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../utils/tests";
import ToDoList from "./index";

describe("<ToDoList />", () => {
  it("renderizar input e botão do formulário de adição de tarefa", () => {
    render(<ToDoList />);

    const input = screen.getByTestId("task_input");
    const button = screen.getByTestId("task_button");

    expect(input);
    expect(button);
  });

  it("renderizar mensagem de erro ao dar submit no formulário com o campo de título vazio", async () => {
    render(<ToDoList />);

    const button = screen.getByTestId("task_button");

    userEvent.click(button);
    const validationText = await screen.findByText(
      "O campo não pode estar vazio!"
    );

    expect(validationText).toBeInTheDocument();
  });

  it("renderizar tarefa cadastrada ao dar submit no formulário com o campo de título preenchido", async () => {
    render(<ToDoList />);

    const input = screen.getByTestId("task_input");
    const button = screen.getByTestId("task_button");

    userEvent.type(input, "Tarefa 1");
    await waitFor(() => {
      expect(input).toHaveValue("Tarefa 1");
    });

    userEvent.click(button);

    const taskText = await screen.findByText("Tarefa 1");
    expect(taskText).toBeInTheDocument();
  });
});
