// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { WebSocket } from "ws";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  let terminal: vscode.Terminal | undefined;
  const ws = new WebSocket("ws://localhost:8082");

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onopen = () => {
    console.log("WebSocket connection established!");
  };

  ws.onmessage = (event) => {
    // start a new terminal
    // check if terminal is already created
    console.log("message", event);

    try {
      if (!terminal) {
        terminal = vscode.window.createTerminal("My WebSocket Terminal");
      }
      terminal.show();
      terminal.sendText("pwd\n");
    } catch (err) {
      console.error("Error creating or using terminal:", err);
    }
  };

  console.log(
    'Congratulations, your extension "site-genie-listener" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  let disposable = vscode.commands.registerCommand(
    "site-genie-listener.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from the Site Genie Listener!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
// export function deactivate() {}
