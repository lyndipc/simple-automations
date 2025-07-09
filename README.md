# macOS Simple Automations

A collection of AppleScript automations for common macOS maintenance tasks using Automator Calendar Alarms.

## Overview

These scripts help automate routine cleanup tasks on macOS by running scheduled AppleScript workflows through Automator and Calendar. Each script can be set to run automatically at specified intervals.

## Prerequisites

- macOS (any version with Automator)
- Calendar app
- Target applications (Mail, Messages, etc.)

## Setup Instructions

### General Setup Process
1. Open **Automator**
2. Choose **"Calendar Alarm"** template
3. Search for and drag **"Run AppleScript"** to workflow area
4. Paste the desired script code
5. Save the workflow (Cmd+S)
6. Open **Calendar** app to find the auto-created event
7. Edit the event to set your preferred schedule
8. Set to repeat as needed (weekly, monthly, etc.)

### Recommended Schedule
- **Mail cleanup**: Weekly on Sunday at 9:00 AM
- **Messages cleanup**: Monthly on first Sunday at 10:00 AM

## Available Scripts

### 1. Mail Archive Cleanup (`mail-archive-cleanup.scpt`)
**Purpose**: Deletes emails from Archive folder older than 30 days

**Features**:
- Processes all mail accounts
- Handles missing Archive folders gracefully
- Shows notification with deletion count
- Batch processing for large archives

**Schedule**: Weekly recommended

### 2. Messages Cleanup (`messages-cleanup.scpt`)
**Purpose**: Deletes local Messages conversations older than 90 days

**Features**:
- Removes conversations from Messages app (not from iCloud/iPhone)
- Configurable age threshold
- Preserves recent conversations
- Shows cleanup summary

**Schedule**: Monthly recommended

## Script Customization

### Changing Age Thresholds
Edit the `cutoffDate` calculation in each script:

```applescript
-- For 60 days instead of 30
set cutoffDate to (current date) - (60 * days)

-- For 1 year
set cutoffDate to (current date) - (365 * days)
```

### Disabling Notifications
Remove or comment out the `display notification` lines:

```applescript
-- display notification "Cleanup complete" with title "Automation"
```

## Troubleshooting

### Script Not Running
- Check Calendar app for the scheduled event
- Verify the event is set to repeat
- Ensure your Mac isn't sleeping at scheduled time
- Check System Preferences > Security & Privacy > Privacy > Automation

### Permission Issues
- Grant Automator access to target applications
- Allow Calendar to run automations
- Check System Preferences > Security & Privacy > Full Disk Access

### Large Archives (10,000+ emails)
The scripts include error handling for large datasets. If timeouts occur:
- Run manually first to reduce volume
- Consider changing to smaller batch sizes
- Schedule during off-peak hours

## Safety Notes

- **Test first**: Run scripts manually before scheduling
- **Backup**: Consider backing up Mail/Messages data before first run
- **Review**: Check what gets deleted in first few runs
- **Adjust**: Modify age thresholds based on your needs

## Contributing

Feel free to submit additional automation scripts following the same pattern:
1. Clear purpose and documentation
2. Error handling for edge cases
3. User notifications for feedback
4. Configurable parameters

## License

MIT License - Feel free to modify and distribute these automations.

---

*These scripts are designed for local cleanup only and don't affect cloud-synced data unless explicitly configured to do so.*
