import type { AWS } from "@serverless/typescript";

import users from "@functions/users";
import usersTable from "@resources/users-table";

const serverlessConfiguration: AWS = {
  service: "serverless-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "dynamodb:PutItem",
        Resource: "arn:aws:dynamodb:us-east-1:653980370712:table/users",
      },
    ],
  },
  // import the function via paths
  functions: { users },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: { Resources: { usersTable } },
};

module.exports = serverlessConfiguration;
