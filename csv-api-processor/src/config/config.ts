export const config = {
    csvPath: process.env.CSV_PATH || './data/assessment_create.csv',
    questionCsvPath: process.env.QUESTION_CSV_PATH || './data/questions.csv',
    baseUrl: process.env.BASE_URL || 'http://localhost:9000',
    createdBy: process.env.CREATED_BY || '8bab8d2d-fac5-4e24-8f12-a3fffe340447',
    organisation: process.env.ORGANISATION ? [process.env.ORGANISATION] : ['Sunbird Org'],
    createdFor: process.env.CREATED_FOR ? [process.env.CREATED_FOR] : ['0142476353387806720'],
    framework: process.env.FRAMEWORK || 'NCF',
    mimeType: process.env.MIME_TYPE || 'application/vnd.ekstep.ecml-archive',
    creator: process.env.CREATOR || 'Content Creator',
    channelId: process.env.CHANNEL_ID || '0142476353387806720'
};