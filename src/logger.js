import chalk from 'chalk';

/**
 * DEBUG Levels - 
 * * INFO - CYAN
 * * DEBUG - BLUE
 * * ERROR - RED
 * * WARN - YELLOW
 * * SUCCESS - GREEN
 */
export function info(message) {
    console.log(chalk.cyan(`[INFO] ${message}`));
}

export function debug(message) {
    console.log(chalk.blue(`[DEBUG] ${message}`));
}

export function error(message) {
    console.log(chalk.red(`[ERROR] ${message}`));
}

export function warn(message) {
    console.log(chalk.yellow(`[WARN] ${message}`));
}

export function success(message) {
    console.log(chalk.green(`${message}`));
}



