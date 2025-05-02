import fs from 'fs';
import path from 'path';
import { parseCsv } from './utils/csv';
import { makeApiCall } from './services/api';
import { createQuestion } from './services/questionService';
import { config } from './config/config';
import { QuestionMapping } from './types';

let questionNodeMap: QuestionMapping = {};

async function saveQuestionMapping() {
    const mappingPath = path.join(__dirname, '../data/question_mapping.json');
    await fs.promises.writeFile(
        mappingPath,
        JSON.stringify(questionNodeMap, null, 2),
        'utf8'
    );
    console.log(`Question mapping saved to ${mappingPath}`);
}

async function processQuestionCsv() {
    try {
        const rows = await parseCsv(config.questionCsvPath);
        // Skip the first row (headers)
        const dataRows = rows.slice(1);
        
        for (const row of dataRows) {
            if (row.length >= 3) {
                const code = row[0];
                const title = row[1];
                const maxScore = parseInt(row[row.length - 1], 10);

                // Process options (starting from index 2, processing pairs)
                const optionPairs = [];
                for (let i = 2; i < row.length - 1; i += 2) {
                    if (i + 1 < row.length - 1) {
                        optionPairs.push({
                            text: row[i],
                            isCorrect: row[i + 1].toLowerCase() === 'true'
                        });
                    }
                }

                const nodeId = await createQuestion(code, title, optionPairs, maxScore);
                questionNodeMap[code] = nodeId;
                console.log(`Mapped question code ${code} to node_id ${nodeId}`);
            }
        }
        console.log('Question processing completed');
        await saveQuestionMapping();
    } catch (error) {
        console.error('Error processing question CSV:', error);
        process.exit(1);
    }
}

async function processContentCsv() {
    try {
        const rows = await parseCsv(config.csvPath);
        // Skip the first row (headers)
        const dataRows = rows.slice(1);
        
        for (const row of dataRows) {
            if (row.length >= 5) {
                const code = row[0];
                const name = row[1];
                const maxAttempts = parseInt(row[2], 10);
                const contentType = row[4];
                await makeApiCall(code, name, maxAttempts, contentType);
            }
        }
        console.log('Content processing completed');
    } catch (error) {
        console.error('Error processing content CSV:', error);
        process.exit(1);
    }
}

async function main() {
    try {
        // First process questions and build the mapping
        console.log('Starting question processing...');
        await processQuestionCsv();
        
        // Then process content
        console.log('Starting content processing...');
        await processContentCsv();
    } catch (error) {
        console.error('Processing failed:', error);
        process.exit(1);
    }
}

main();