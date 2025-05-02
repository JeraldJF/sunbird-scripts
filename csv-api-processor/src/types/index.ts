// src/types/index.ts

export interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export type CsvRow = string[];

export interface QuestionResponse {
    result: {
        node_id: string;
        versionKey: string;
    }
}

export interface QuestionMapping {
    [key: string]: string;  // code -> node_id mapping
}