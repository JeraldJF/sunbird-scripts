import axios from 'axios';
import clipboardy from 'clipboardy';
import { config } from '../config/config';
import { routes } from '../config/routes';
import { QuestionMapping } from '../types';

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
    const body: ContentUpdateRequestBody = {
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
                body: updateData.body || ""                
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
        const response = await axios.get(`${config.baseUrl}/assessment/v1/items/read/${identifier}`, { headers });
        console.log(`Fetched assessment item ${identifier}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching assessment item ${identifier}:`, error);
        throw error;
    }
}