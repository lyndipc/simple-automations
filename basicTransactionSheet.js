/** 
 * Basic Transaction Sheet
 * 
 * This script can be deployed in Google App Scripts;
 * 
 * Grabs emails with a specified Gmail label, parses the body of the email for transaction details, inserts details into a Google sheet.
 * Basic transaction sheet inserts a row with the following fields (by column): date of email, account number, vendor name, and transaction amount.
 * NOTE: Currently, the vendor name regex needs to be improved and therefore, vendor field will be empty (for now).
*/

let transactionSheet = SpreadsheetApp.openById("SPREADSHEET ID").getSheetByName("SHEET NAME");

/**
 * Select emails by label and retrieve transaction data from email
 * data = (account number, message date, transaction amount)
 */
function getTransactionEmails() {
  let label = GmailApp.getUserLabelByName("LABEL NAME");
  
  // If label exists, get threads from label and sort through unread messages
  if (label) {
    let threads = label.getThreads();

    for (let i in threads) {
      let messages = threads[i].getMessages();
      
      for (let j in messages) {
        // Define messages to mark as read
        var unreadMessages = messages[j];

        // Find unread messages
        if (messages[j].isUnread()) {
          let emailBody = messages[j].getBody();

          var message_account = "",
              message_date = "",
              message_vendor = "",
              message_amount = "";
          
          // Find account number
          let regExpAcct = /(\d{4})/i;
          let CO_message_account = regExpAcct.exec(emailBody);

          if (CO_message_account) {
            message_account = CO_message_account[1];
            Logger.log("***Email message account: " + message_account);
          }

          // Get transaction date
          let CO_message_date = messages[j].getDate();

          if (CO_message_date) {
            message_date = CO_message_date;
            Logger.log("***Email message date: " + message_date);
          }

          // Get vendor name
          // TODO: Update to properly detect vendor
          let regExpVendor = /, at (...+),/;
          let CO_message_vendor = regExpVendor.exec(emailBody);

          if (CO_message_vendor) {
            message_vendor = CO_message_vendor;
            Logger.log("***Email message vendor: " + message_vendor);
          }

          // Get transaction amount
          let regExAmount = /\$(\d*\.?\d*)/i;
          let CO_message_amount = regExAmount.exec(emailBody);

          if (CO_message_amount) {
            message_amount = CO_message_amount[1];
            Logger.log("***Email message amount: " + message_amount);
          }
        }
      }
    }

    if (message_date && message_account && message_amount) {
      // Adds all fields to spreadsheet
      let transaction = [
        message_date,
        message_account,
        message_vendor,
        message_amount
      ];

      // Add transaction data to Google Sheet & mark message as read
      transactionSheet.appendRow(transaction);
      unreadMessages.markRead();

    } else {
      Logger.log("***Some of the email fields are empty");
    }
  }
}

