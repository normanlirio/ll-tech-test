# WebDriverIO Project with TypeScript

This project uses WebDriverIO with TypeScript for automated testing.

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables:**

   Before running tests, set the following environment variables:
   
   - `EMAIL1`: Your first email address for testing.
   - `EMAIL2`: Your second email address for testing.
   - `PASSWORD`: Password associated with the email addresses.

   **Example (PowerShell):**
   ```powershell
   $env:EMAIL1 = "<email1@example.com>"
   $env:EMAIL2 = "<email2@example.com>"
   $env:PASSWORD = "<your_password>"
   ```

   **Example (Bash/Linux/macOS):**
   ```bash
   export EMAIL1="<email1@example.com>"
   export EMAIL2="<email2@example.com>"
   export PASSWORD="<your_password>"
   ```

4. **Build TypeScript files:**

   ```bash
   npm run build
   ```

## Running Tests

### PowerShell

1. Open PowerShell and navigate to the project directory.

2. Run tests:

   ```powershell
   npm test
   ```

### Bash (Linux/macOS)

1. Open Terminal and navigate to the project directory.

2. Run tests:

   ```bash
   npm test
   ```

## Notes

- Ensure Node.js and npm are installed on your machine.
- Modify `wdio.conf.ts` and other configuration files as needed for your specific WebDriverIO setup.
- Tests are located in the `test` directory.