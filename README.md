# soltool

A CLI tool to convert Solana keypair JSON files to base58 format and vice versa.

## Installation

```bash
npm install -g soltool
```

## Usage

Convert keypair JSON to base58:

```bash
soltool -i keypair.json
```

Extract public key only:

```bash
soltool -i keypair.json --public-key
```

Save output to file:

```bash
soltool -i keypair.json -o keypair.txt
```

Convert base58 back to JSON:

```javascript
const { base58ToJson } = require("soltool");

// Convert base58 string to JSON
const base58String = "2NEpo7TZRRrLZSi2U";
const jsonData = base58ToJson(base58String);
console.log(jsonData);
```

### Options

- `-i, --input <path>`: Input keypair JSON file path (required)
- `-o, --output <path>`: Output file path (optional)
- `-p, --public-key`: Display public key only
- `--help`: Display help information
- `--version`: Display version information

## Input Format

The input JSON file should contain an array of 64 numbers representing the Solana keypair bytes:

```json
[
  124, 201, 5, 69, ..., 233  // 64 numbers total
]
```

## API Reference

### base58ToJson(base58String)

Converts a base58-encoded string back to its original JSON format.

- **Parameters:**
  - `base58String` (string): The base58-encoded string to decode
- **Returns:** The decoded JSON data
- **Throws:** Error if the input is invalid or cannot be decoded

## License

MIT
