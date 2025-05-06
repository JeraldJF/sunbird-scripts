export const config = {
    csvPath: process.env.CSV_PATH || './data/assessment_create.csv',
    questionCsvPath: process.env.QUESTION_CSV_PATH || './data/questions.csv',
    baseUrl: process.env.BASE_URL || 'http://localhost:9000',
    createdBy: process.env.CREATED_BY || '927c2094-987f-4e8f-8bd5-8bf93e3d2e8a',
    organisation: process.env.ORGANISATION ? [process.env.ORGANISATION] : ['FMPS Org'],
    createdFor: process.env.CREATED_FOR ? [process.env.CREATED_FOR] : ['01429195271738982411'],
    framework: process.env.FRAMEWORK || 'FMPS',
    mimeType: process.env.MIME_TYPE || 'application/vnd.ekstep.ecml-archive',
    creator: process.env.CREATOR || 'Content Creator FMPS',
    channelId: process.env.CHANNEL_ID || '01429195271738982411'
};