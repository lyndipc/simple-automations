tell application "Mail"
    set cutoffDate to (current date) - (30 * days)
    set batchSize to 100 -- Process in smaller batches
    set totalDeleted to 0
    
    repeat with eachAccount in accounts
        try
            set archiveMailbox to mailbox "Archive" of eachAccount
            
            -- Get messages in batches to avoid memory issues
            repeat
                set messageBatch to (messages 1 thru batchSize of archiveMailbox whose date received < cutoffDate)
                
                if (count of messageBatch) is 0 then exit repeat
                
                repeat with eachMessage in messageBatch
                    delete eachMessage
                    set totalDeleted to totalDeleted + 1
                end repeat
                
                -- Brief pause to prevent overwhelming Mail
                delay 0.1
                
            end repeat
            
            display notification "Deleted " & totalDeleted & " old emails" with title "Mail Cleanup"
            
        on error errorMessage
            display notification "Error: " & errorMessage with title "Mail Cleanup Error"
        end try
    end repeat
end tell
