// usersTable export
export default {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
        TableName: 'users',
        AttributeDefinitions: [
            {
                AttributeName: 'cpf',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'cpf',
                KeyType: 'HASH',
            },
        ],
        BillingMode: 'PAY_PER_REQUEST',
    },
}
