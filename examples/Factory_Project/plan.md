# Python Password Generator: Technical Plan

## Step 1: Requirements Definition
- **Core Functionality**: Generate a secure, random password based on user specifications.
- **Configurable Parameters**:
  - **Length**: Customizable password length (default: 16 characters, minimum: 8, maximum: 128).
  - **Character Sets**:
    - Uppercase letters (A-Z)
    - Lowercase letters (a-z)
    - Digits (0-9)
    - Special characters (!@#$%^&*(), etc.)
  - Option to enable or disable specific character sets via flags.
- **Security**: Must use a cryptographically secure random number generator (e.g., Python's `secrets` module instead of the standard `random` module) to ensure password strength against predictability.
- **Interface**: Command-Line Interface (CLI) for ease of use, scripting, and automation.

## Step 2: Architecture & Design
- **File Structure**:
  - `generator.py`: Core logic containing the password generation algorithm.
  - `main.py`: Entry point handling user inputs via the terminal.
- **Key Functions**:
  - `build_character_pool(upper, lower, digits, special)`: Constructs the string of valid characters based on user preferences.
  - `generate_password(length, pool)`: Randomly selects characters from the pool using `secrets.choice()` and returns the password string.
- **Dependencies**: 
  - Standard Python libraries only: `secrets` (for cryptography), `string` (for character constants), and `argparse` (for CLI handling). 
  - No external packages (like those from PyPI) are required, keeping the project lightweight.

## Step 3: Implementation Details
- **Environment**: Python 3.6+ (required for the `secrets` module).
- **Execution Flow**:
  1. **Input Parsing**: The script is executed from the terminal. `argparse` reads optional flags (e.g., `--length 20`, `--no-special`, `--no-digits`).
  2. **Validation**: The script validates inputs (e.g., ensuring length is $\ge$ 8 and at least one character set is selected).
  3. **Pool Creation**: The `build_character_pool` function concatenates `string.ascii_uppercase`, `string.ascii_lowercase`, `string.digits`, and `string.punctuation` based on the parsed flags.
  4. **Generation**: `generate_password` guarantees that at least one character from each selected set is included (to meet complexity rules), fills the rest of the required length from the pool, shuffles the result, and returns it.
  5. **Output**: The final password is printed securely to the standard output.
