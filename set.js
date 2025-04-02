const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUNrODlYTlJNcDEwbnZFMHI0bTFtaGU4VXRXYkdJZm15aERsMHFURVhWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0Y1Q1ZiUEkvalV1VTU3Q2NvK2RUaVZKdFROMFFtWFF4NTkyTG83VjBUbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTGxRZHI3emdVVXI2WDdjSUY3RnBSTmwwQktDa3BzVVVGV0YxVk5Uems0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpa0dNOEVoYzhUSXRMMG9CczI4am9LUi9UNVdOaXRIZFJCZjVVUGdtNFVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNNNUtlaDVhdVArSm5za1VGcCtkcHVHcGdSclZ3WHlVQzZsVzVSTFpSa1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNMREVqVkZqdS9CVENmby9reXp3MThiVk91eWtBQjhlZjMxOTRCb284ekU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUJRR0dYQ0g0QzF0bFR0YThOR21FMURQeFhGS3N4d2JFRCtFSEZ3VW9HMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVRDQytNbXV5em1WTGVXMEV4aW9WU09BMTNQZ25CbTZxVGJLQ3IyQzZsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik54M3BCa3BmYitNNjNkQjBqN2t5OE1IM2FmcS9rRFdqcTVQV3IwMVVaWStlYWNFeFUxNDNOWVJxeFhEbjhvaXE4M1JwS1Y2OTNlRmZib1ViZ2U4MUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6Im9zUzBCR0grWTMxSVZ3bC9FS0NURkk4Zklhb0U2cjFFTWNyQlRqVndIRmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImE2R1UwTUcxUzdLUVRDUjZyN0I1X3ciLCJwaG9uZUlkIjoiOTE3ODU0NGMtYzNjYS00NGM2LTgzMTAtN2Y1YWYwMmE1ZjMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkczekxqeDZNRTVtWnhVRUVaMjBuRkgrR2ZlWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRnBCNnN1R0xRZzVWWjRhWHBybExvaDJLY009In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ0I3VjZER00iLCJtZSI6eyJpZCI6IjI1NDc5OTIxMTM1Nzo3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOV0ZwOGtIRU5IM3RMOEdHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDM3cvRFBQQ3JUZ2pwMzZ5VXVLV0FuZ0s3SlExalFQeS9IME5wdEdBcWtJPSIsImFjY291bnRTaWduYXR1cmUiOiJQc2ZBdlVXU0JIQjcrYUtnQ3ZRZzY3Q2Z5NXBnUHpHZ0ptc2k3T2ZCU2dPM1diSGhvS1J0NzJ4MUNocHZYSEQ1bGVSWFB6dXFnM3dFM3UzQ3A0RjZEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiV3JTOEJ6ZVBEV1NTeEpKalVzaDFFcHZBL1FQSWxHaFZ6TzJFeEZwTVUyTVhrUTlVcEM3U21rbk5YbjYwblorYkFXR0JKcHdQU2pJbDV6YzV0enZaQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTkyMTEzNTc6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRdDhQd3p6d3EwNEk2ZCtzbExpbGdKNEN1eVVOWTBEOHZ4OURhYlJnS3BDIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzNjAwNjA2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUduWiJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE "on",
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
