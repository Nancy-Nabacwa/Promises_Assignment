/*N0.1 Write an asynchronous function that accepts a message string and a delay time in milliseconds.
 The function should log the message to the console after the specified delay time.*/

 async function showMessageAfterDelay(message, delayTime) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve();  
        }, delayTime);
    });
}
showMessageAfterDelay("Hello, receive your money after the beep!", 5000)


/* N0.2 You have an array of user IDs and a function getUserData(id) that returns a Promise with user data when given a user ID. 
Write an asynchronous function that fetches and logs the data for each user ID one by one, in sequence. */
async function getUserData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ userId: id, username: "nancaepaupy", email: "nancypa2045@gmail.com" });
        }, 1000);
    });
}
const userIds = [1, 2, 3, 4, 5];

async function fetchAndLogUserDataSequentially(userIds) {
    for (const id of userIds) {  
        try {
            const userData = await getUserData(id);  
            console.log(userData);  
        } catch (error) {
            console.error(`Failed to fetch data for user ID ${id}: ${error}`);  
        }
    }
}


fetchAndLogUserDataSequentially(userIds);


/*N0.3 You have an asynchronous function performTask() that returns a Promise. The Promise resolves if the task is successful and rejects if there's an error.
 Write a function that calls performTask() and logs a custom success message if the task is successful, and a custom error message if there's an error. */
 const successfulTask = true;
 function performTask() {
    return new Promise((resolve, reject) => {
            if (successfulTask) {
                resolve("Task completed successfully!");
            } else {
                reject("Task failed due to an error.");
            }
        }
    )
};
async function handleTask() {
    try {
        const result = await performTask();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
handleTask();


/*N0.4 Write a function unstableTask that:
1.Accepts a taskName and failureProbability (a number between 0 and 1).
2. Returns a Promise that:
Resolves immediately with a success message if a randomly generated number is greater than failureProbability.
Rejects immediately with a failure message if a randomly generated number is less than or equal to failureProbability.
Write another function executeWithRetry that:

Accepts a taskName, retries, and failureProbability.
Uses a retry mechanism to attempt the unstableTask up to retries times.
Logs whether the task succeeded or failed after all attempts.*/

const randomGeneratedNumber = Math.random();
function unstableTask(taskName, failureProbability) {
    return new Promise((resolve, reject) => {
        if (randomGeneratedNumber > failureProbability) {
            resolve(`${taskName} succeeded`);
        } else {
            reject(`${taskName} failed`);
        }
    });
}

async function executeWithRetry(taskName, retries, failureProbability) {
    let attempt = 0;
    while (attempt < retries) {
        attempt++;
        try {
            const result = await unstableTask(taskName, failureProbability);
            console.log(`Success: ${result}`); 
            return;
        } catch (error) {
            console.log(`Attempt ${attempt}: ${error}`); 
            if (attempt >= retries) {
                console.log(`Task "${taskName}" failed after ${retries} attempts.`);
            }
        }
    }
}

executeWithRetry("Pass Assessment", 5, 0.5);
