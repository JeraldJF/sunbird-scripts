export const config = {
    csvPath: process.env.CSV_PATH || './data/assessment_create.csv',
    questionCsvPath: process.env.QUESTION_CSV_PATH || './data/questions.csv',
    baseUrl: process.env.BASE_URL || 'http://localhost:9000',
    createdBy: process.env.CREATED_BY || 'e273a75c-a0c1-49f0-b585-1a328589a9b4',
    organisation: process.env.ORGANISATION ? [process.env.ORGANISATION] : ['Sunbird Org'],
    createdFor: process.env.CREATED_FOR ? [process.env.CREATED_FOR] : ['0143069945593200640'],
    framework: process.env.FRAMEWORK || 'NCF',
    mimeType: process.env.MIME_TYPE || 'application/vnd.ekstep.ecml-archive',
    creator: process.env.CREATOR || 'Content Creator',
    channelId: process.env.CHANNEL_ID || '0143069945593200640',
    se_configs:{
        gradeLevel: ["Class 1"],  
        medium: ["English"],
        boards: ["CBSE"],
        subject: ["English"],
        board: "CBSE",
        consumerId: process.env.CREATED_BY || 'e273a75c-a0c1-49f0-b585-1a328589a9b4'
    }
};