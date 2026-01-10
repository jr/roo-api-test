# Roo API Test Extension

A VS Code extension for testing the Roo Code extension API, featuring real-time token usage monitoring.

## Features

### Token Usage Monitoring

Monitor token consumption and costs in real-time as Roo Code tasks execute. The extension tracks:

- Token input/output counts
- Cache reads and writes
- Total costs per task
- Tool usage statistics
- Session aggregates

## Commands

### Configure Roo Code
- **Command**: `Configure Roo Code`
- **Description**: Basic configuration testing for Roo Code extension

### Start Token Usage Monitor
- **Command**: `Start Token Usage Monitor`
- **Description**: Begins monitoring token usage for all Roo Code tasks
- **Output**: Opens the "Roo Token Usage" output channel with real-time updates

### Stop Token Usage Monitor
- **Command**: `Stop Token Usage Monitor`
- **Description**: Stops monitoring and displays a session summary

### Show Token Usage Summary
- **Command**: `Show Token Usage Summary`
- **Description**: Displays aggregate statistics for the current monitoring session

### Clear Token Usage Data
- **Command**: `Clear Token Usage Data`
- **Description**: Resets all tracking data and clears the output channel

## Usage

1. Install the extension in VS Code
2. Ensure the Roo Code extension is installed and active
3. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
4. Run `Start Token Usage Monitor`
5. Execute tasks in Roo Code - the output channel will show:
   - Task creation notifications
   - Real-time token usage updates with deltas
   - Task completion summaries with tool statistics
6. Run `Show Token Usage Summary` to see session aggregates
7. Run `Stop Token Usage Monitor` when finished

## Output Format

### Task Creation
```
════════════════════════════════════════════════════════════════
[2026-01-10 01:20:00] NEW TASK CREATED
Task ID: abc123
════════════════════════════════════════════════════════════════
```

### Token Usage Updates
```
[2026-01-10 01:20:15] TOKEN UPDATE - Task: abc123
  Tokens In:    1,234 (+234)
  Tokens Out:     567 (+67)
  Cache Writes:   100
  Cache Reads:     50
  Context:      1,801
  Cost:        $0.0234 (+$0.0034)
```

### Task Completion
```
════════════════════════════════════════════════════════════════
[2026-01-10 01:25:00] TASK COMPLETED
Task ID: abc123
Duration: 5m 0s

FINAL TOKEN USAGE:
  Total Tokens In:  5,432
  Total Tokens Out: 2,345
  Cache Writes:       500
  Cache Reads:        250
  Final Cost:      $0.1234

TOOL STATISTICS:
  read_file          : 5 attempts, 0 failures
  write_to_file      : 3 attempts, 1 failure
  execute_command    : 2 attempts, 0 failures

════════════════════════════════════════════════════════════════
```

### Session Summary
```
╔══════════════════════════════════════════════════════════════╗
║              TOKEN USAGE SESSION SUMMARY                     ║
╠══════════════════════════════════════════════════════════════╣
║  Session Started: 2026-01-10 01:00:00                        ║
║  Session Duration: 25m 30s                                   ║
║                                                              ║
║  Total Tasks: 5                                              ║
║  Completed Tasks: 4                                          ║
║                                                              ║
║  Aggregate Tokens In:  25,432                                ║
║  Aggregate Tokens Out: 12,345                                ║
║  Total Session Cost:   $0.5678                               ║
╚══════════════════════════════════════════════════════════════╝
```

## API Events Used

This extension demonstrates the following Roo Code API events:

- `taskCreated` - Fired when a new task is created
- `taskTokenUsageUpdated` - Fired when token usage changes during task execution
- `taskCompleted` - Fired when a task finishes, includes final usage and tool statistics

## Development

### Building
```bash
npm install
npm run compile
```

### Testing
```bash
npm test
```

### Running in Development
1. Open this folder in VS Code
2. Press F5 to start debugging
3. The extension will run in a new Extension Development Host window

## Requirements

- VS Code 1.99.1 or higher
- Roo Code extension (`rooveterinaryinc.roo-cline`)

## License

See LICENSE file for details.
