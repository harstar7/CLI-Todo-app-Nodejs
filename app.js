import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let todo = [];

// Load tasks from file if it exists
const loadTasks = () => {
    try {
        const data = fs.readFileSync('tasks.json', 'utf8');
        todo = JSON.parse(data);
    } catch (err) {
        // File doesn't exist or is empty, start with an empty array
        todo = [];
    }
};

// Save tasks to file
const saveTasks = () => {
    fs.writeFileSync('tasks.json', JSON.stringify(todo,null,1), 'utf8');
};

const showMenu = () => {
    console.log("\n1: Add a Task");
    console.log("2: View Tasks");
    console.log("3: Delete a Task");
    console.log("4: Exit");
    rl.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
    switch (option) {
        case '1':
            rl.question("Enter the task: ", (task) => {
                if (task.trim() === '') {
                    console.log("Task cannot be empty. Please try again.");
                } else {
                    todo.push(task);
                    saveTasks();
                    console.log("Task added: ", task);
                }
                showMenu();
            });
            break;
        case '2':
            console.log("\nYour todo list:");
            if (todo.length === 0) {
                console.log("No tasks yet!");
            } else {
                todo.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`);
                });
            }
            showMenu();
            break;
        case '3':
            if (todo.length === 0) {
                console.log("No tasks to delete.");
                showMenu();
            } else {
                console.log("\nYour todo list:");
                todo.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`);
                });
                rl.question("Enter the task number to delete: ", (taskNum) => {
                    const index = parseInt(taskNum) - 1;
                    if (isNaN(index) || index < 0 || index >= todo.length) {
                        console.log("Invalid task number. Please try again.");
                    } else {
                        const deletedTask = todo.splice(index, 1)[0];
                        saveTasks();
                        console.log(`Deleted task: ${deletedTask}`);
                    }
                    showMenu();
                });
            }
            break;
        case '4':
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid option. Please try again.");
            showMenu();
    }
};

// Load tasks when starting the application
loadTasks();
showMenu();