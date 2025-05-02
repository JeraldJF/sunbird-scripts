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

export async function makeApiCall(
    code: string, 
    name: string, 
    maxAttempts: number, 
    contentType: string
): Promise<void> {
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
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}