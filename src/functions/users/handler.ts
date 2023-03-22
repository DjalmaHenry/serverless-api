import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const users: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const { cpf, name, email } = event.body;
    
    const params = {
        TableName: 'users',
        Item: {
            cpf,
            name,
            email,
        },
    };
    
    try {
        await dynamoDb.put(params).promise();
        return formatJSONResponse({
        message: `User with cpf ${cpf} was created`,
        item: params.Item,
        });
    } catch (error) {
        console.log(error);
        return formatJSONResponse(
        {
            message: `Error creating user with cpf ${cpf}`,
            error: error,
        },
        );
    }
};

export const main = middyfy(users);
