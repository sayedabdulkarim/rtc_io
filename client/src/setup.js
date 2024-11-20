import * as process from "process";

window.global = window; // Define the global object for compatibility
window.process = process; // Assign the process object
window.Buffer = []; // Handle Buffer (optional, depends on your error)
