# soltool

A CLI tool to convert Solana keypair JSON files to base58 format.

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

## License

MIT
# soltool
