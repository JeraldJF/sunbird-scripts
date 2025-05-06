export const questionConfig = {
    baseUrl: process.env.BASE_URL || 'http://localhost:8080',
    plugin: {
        id: process.env.PLUGIN_ID || 'org.ekstep.questionunit.mcq',
        version: process.env.PLUGIN_VERSION || '1.3',
        templateId: process.env.TEMPLATE_ID || 'horizontalMCQ'
    },
    defaultValues: {
        template: 'NA',
        template_id: 'NA',
        version: 2,
        itemType: 'UNIT',
        objectType: 'AssessmentItem',
        category: 'MCQ',
        type: 'mcq'
    },
    metadata: {
        copyright: process.env.COPYRIGHT || 'FMPS Org',
        board: process.env.BOARD || 'CBSE',
        medium: process.env.MEDIUM || 'English',
        gradeLevel: process.env.GRADE_LEVEL ? [process.env.GRADE_LEVEL] : ['Class 1'],
        subject: process.env.SUBJECT || 'English',
        partial_scoring: process.env.PARTIAL_SCORING === 'false' ? false : true,
        layout: process.env.LAYOUT || 'Horizontal',
        isShuffleOption: process.env.IS_SHUFFLE_OPTION === 'true' ? true : false,
        orgainsation: process.env.ORGANISATION ? [process.env.ORGANISATION] : ['Fmps'],
    }
};