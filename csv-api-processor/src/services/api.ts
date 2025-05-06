import axios from 'axios';
import { config } from '../config/config';
import { routes } from '../config/routes';
import { questionConfig } from '../config/questionConfig';

interface ContentRequestBody {
    request: {
        content: {
            code: string;
            name: string;
            maxAttempts: number;
            description: string;
            createdBy: string;
            organisation: string[];
            createdFor: string[];
            framework: string;
            mimeType: string;
            creator: string;
            contentType: string;
        }
    }
}

interface ContentUpdateRequestBody {
    request: {
        content: {
            versionKey: string;
            lastUpdatedBy: string;
            stageIcons: string;
            totalQuestions: number;
            totalScore: number;
            questions: Array<{ identifier: string }>;
            assets: any[];
            editorState: string;
            pragma: any[];
            plugins: Array<{
                identifier: string;
                semanticVersion: string;
            }>;
            body: string;
            copyright: string;
            organisation: string[];
        }
    }
}

export async function makeApiCall(
    code: string,
    name: string,
    maxAttempts: number,
    contentType: string
): Promise<{ identifier: string; versionKey: string }> {
    const body: ContentRequestBody = {
        request: {
            content: {
                code,
                name,
                maxAttempts,
                description: "Enter description for Assessment",
                createdBy: config.createdBy,
                organisation: config.organisation,
                createdFor: config.createdFor,
                framework: config.framework,
                mimeType: config.mimeType,
                creator: config.creator,
                contentType
            }
        }
    };

    const headers = {
        'X-Channel-Id': config.channelId,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(`${config.baseUrl}${routes.createContent}`, body, { headers });
        console.log('API Response:', response.data);
        return {
            identifier: response.data.result.node_id,
            versionKey: response.data.result.versionKey
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export async function updateContent(
    nodeId: string,
    versionKey: string,
    updateData: Partial<ContentUpdateRequestBody['request']['content']>
): Promise<void> {
    const body = {
        request: {
            content: {
                versionKey,
                lastUpdatedBy: config.createdBy,
                stageIcons: updateData.stageIcons || "",
                totalQuestions: updateData.totalQuestions || 0,
                totalScore: updateData.totalScore || 0,
                questions: updateData.questions || [],
                assets: updateData.assets || [],
                editorState: updateData.editorState || "",
                pragma: updateData.pragma || [],
                plugins: updateData.plugins || [],
                body: updateData.body || "",
                copyright: questionConfig.metadata.copyright,
                organisation: config.organisation || [],
                se_mediums: config.se_configs.medium,
                gradeLevel: config.se_configs.gradeLevel,
                se_gradeLevels: config.se_configs.gradeLevel,
                se_subjects: config.se_configs.subject,
                medium: config.se_configs.medium,
                se_boards: config.se_configs.boards,
                subject: config.se_configs.subject,
                board: config.se_configs.board,
                consumerId: config.se_configs.consumerId
            }
        }
    };

    const headers = {
        'X-Channel-Id': config.channelId,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.patch(`${config.baseUrl}${routes.updateContent}/${nodeId}`, body, { headers });
        console.log('Update API Response:', response.data);
    } catch (error) {
        console.error('Update API Error:', error);
        throw error;
    }
}

export async function getAssessmentItem(identifier: string): Promise<any> {
    const headers = {
        'X-Channel-Id': config.channelId,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(`${questionConfig.baseUrl}/learning-service/assessment/v3/items/read/${identifier}`, { headers });
        console.log(`Fetched assessment item ${identifier}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching assessment item ${identifier}:`, error);
        throw error;
    }
}

export async function reviewContent(identifier: string): Promise<void> {
    const headers = {
        'X-Channel-Id': config.channelId,
        'Content-Type': 'application/json'
    };

    const body = {
        request: {
            content: {}
        }
    };

    try {
        const response = await axios.post(`${config.baseUrl}${routes.reviewContent}/${identifier}`, body, { headers });
        console.log('Review API Response:', response.data);
    } catch (error) {
        console.error('Review API Error:', error);
        throw error;
    }
}

export async function publishContent(identifier: string): Promise<void> {
    const headers = {
        'X-Channel-Id': config.channelId,
        'Content-Type': 'application/json'
    };

    const body = {
        request: {
            content: {
                lastPublishedBy: config.createdBy
            }
        }
    };

    try {
        const response = await axios.post(`${config.baseUrl}${routes.publishContent}/${identifier}`, body, { headers });
        console.log('Publish API Response:', response.data);
    } catch (error) {
        console.error('Publish API Error:', error);
        throw error;
    }
}