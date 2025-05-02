# README.md

# CSV API Processor

This project is a Node.js application that processes a CSV file, extracts the second value from each line, and makes API calls using that value.

## Project Structure

```
csv-api-processor
├── src
│   ├── index.ts          # Entry point of the application
│   ├── services
│   │   └── api.ts        # API call functions
│   ├── utils
│   │   └── csv.ts        # CSV parsing utility
│   └── types
│       └── index.ts      # Type definitions
├── data
│   └── input.csv         # Input CSV file
├── package.json           # NPM configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd csv-api-processor
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application, execute the following command:
```
npm start
```

Make sure to have the `input.csv` file in the `data` directory with the appropriate format.

## Dependencies

- Node.js
- TypeScript

## License

This project is licensed under the MIT License.