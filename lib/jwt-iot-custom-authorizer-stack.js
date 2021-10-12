"use strict";
// Copyright 2020 angmas
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
class JwtIotCustomAuthorizerStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        let username = new cdk.CfnParameter(this, 'username', {
            default: 'aladdin',
            description: 'The username to authenticate the MQTT client'
        });
        let password = new cdk.CfnParameter(this, 'password', {
            default: 'opensesame',
            description: 'The password to authenticate the MQTT client'
        });
        let token = new cdk.CfnParameter(this, 'token', {
            default: 'allow',
            description: 'The password to authenticate the MQTT client'
        });
        let customAuthorizerLambda = new lambda.Function(this, 'iot-custom-auth', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'lambda.handler',
            code: new lambda.AssetCode('./lambda/iot-custom-auth'),
            environment: {
                "AWS_ACCOUNT": this.account,
            }
        });
        let customAuthorizerLambdaMQTT = new lambda.Function(this, 'iot-custom-auth-mqtt', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'lambda.handler',
            code: new lambda.AssetCode('./lambda/iot-mqtt-custom-auth'),
            environment: {
                "AWS_ACCOUNT": this.account,
                "USERNAME": username.valueAsString,
                "PASSWORD": password.valueAsString,
                "TOKEN": token.valueAsString
            }
        });
        new cdk.CfnOutput(this, "lambdaArn", {
            description: "CustomAuth Arn",
            value: customAuthorizerLambda.functionArn
        });
        new cdk.CfnOutput(this, "lambdaArnMqtt", {
            description: "CustomAuthMQTT Arn",
            value: customAuthorizerLambdaMQTT.functionArn
        });
    }
}
exports.JwtIotCustomAuthorizerStack = JwtIotCustomAuthorizerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWlvdC1jdXN0b20tYXV0aG9yaXplci1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImp3dC1pb3QtY3VzdG9tLWF1dGhvcml6ZXItc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUF3QjtBQUN4QixHQUFHO0FBQ0gsa0VBQWtFO0FBQ2xFLG1FQUFtRTtBQUNuRSwwQ0FBMEM7QUFDMUMsR0FBRztBQUNILGlEQUFpRDtBQUNqRCxHQUFHO0FBQ0gsc0VBQXNFO0FBQ3RFLG9FQUFvRTtBQUNwRSwyRUFBMkU7QUFDM0Usc0VBQXNFO0FBQ3RFLGlDQUFpQzs7QUFJakMscUNBQXFDO0FBQ3JDLDhDQUE2QztBQUc3QyxNQUFhLDJCQUE0QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3hELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDcEQsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFLDhDQUE4QztTQUM1RCxDQUFDLENBQUE7UUFFRixJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwRCxPQUFPLEVBQUUsWUFBWTtZQUNyQixXQUFXLEVBQUUsOENBQThDO1NBQzVELENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzlDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFdBQVcsRUFBRSw4Q0FBOEM7U0FDNUQsQ0FBQyxDQUFBO1FBRUYsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDO1lBQ3RELFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDNUI7U0FDRixDQUFDLENBQUE7UUFFRixJQUFJLDBCQUEwQixHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDakYsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsK0JBQStCLENBQUM7WUFDM0QsV0FBVyxFQUFFO2dCQUNYLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDM0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxhQUFhO2dCQUNsQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGFBQWE7Z0JBQ2xDLE9BQU8sRUFBRSxLQUFLLENBQUMsYUFBYTthQUM3QjtTQUNGLENBQUMsQ0FBQTtRQUVGLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ25DLFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsS0FBSyxFQUFFLHNCQUFzQixDQUFDLFdBQVc7U0FDMUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkMsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxLQUFLLEVBQUUsMEJBQTBCLENBQUMsV0FBVztTQUM5QyxDQUFDLENBQUE7SUFFSixDQUFDO0NBQ0Y7QUFuREQsa0VBbURDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAgYW5nbWFzXG4vLyBcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vIFxuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy8gXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5cblxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnXG5cblxuZXhwb3J0IGNsYXNzIEp3dElvdEN1c3RvbUF1dGhvcml6ZXJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBsZXQgdXNlcm5hbWUgPSBuZXcgY2RrLkNmblBhcmFtZXRlcih0aGlzLCAndXNlcm5hbWUnLCB7XG4gICAgICBkZWZhdWx0OiAnYWxhZGRpbicsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSB1c2VybmFtZSB0byBhdXRoZW50aWNhdGUgdGhlIE1RVFQgY2xpZW50J1xuICAgIH0pXG5cbiAgICBsZXQgcGFzc3dvcmQgPSBuZXcgY2RrLkNmblBhcmFtZXRlcih0aGlzLCAncGFzc3dvcmQnLCB7XG4gICAgICBkZWZhdWx0OiAnb3BlbnNlc2FtZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBwYXNzd29yZCB0byBhdXRoZW50aWNhdGUgdGhlIE1RVFQgY2xpZW50J1xuICAgIH0pXG5cbiAgICBsZXQgdG9rZW4gPSBuZXcgY2RrLkNmblBhcmFtZXRlcih0aGlzLCAndG9rZW4nLCB7XG4gICAgICBkZWZhdWx0OiAnYWxsb3cnLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgcGFzc3dvcmQgdG8gYXV0aGVudGljYXRlIHRoZSBNUVRUIGNsaWVudCdcbiAgICB9KVxuXG4gICAgbGV0IGN1c3RvbUF1dGhvcml6ZXJMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdpb3QtY3VzdG9tLWF1dGgnLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdsYW1iZGEuaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9sYW1iZGEvaW90LWN1c3RvbS1hdXRoJyksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBcIkFXU19BQ0NPVU5UXCI6IHRoaXMuYWNjb3VudCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IGN1c3RvbUF1dGhvcml6ZXJMYW1iZGFNUVRUID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnaW90LWN1c3RvbS1hdXRoLW1xdHQnLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdsYW1iZGEuaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9sYW1iZGEvaW90LW1xdHQtY3VzdG9tLWF1dGgnKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFwiQVdTX0FDQ09VTlRcIjogdGhpcy5hY2NvdW50LFxuICAgICAgICBcIlVTRVJOQU1FXCI6IHVzZXJuYW1lLnZhbHVlQXNTdHJpbmcsXG4gICAgICAgIFwiUEFTU1dPUkRcIjogcGFzc3dvcmQudmFsdWVBc1N0cmluZyxcbiAgICAgICAgXCJUT0tFTlwiOiB0b2tlbi52YWx1ZUFzU3RyaW5nXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwibGFtYmRhQXJuXCIsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkN1c3RvbUF1dGggQXJuXCIsXG4gICAgICB2YWx1ZTogY3VzdG9tQXV0aG9yaXplckxhbWJkYS5mdW5jdGlvbkFyblxuICAgIH0pXG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcImxhbWJkYUFybk1xdHRcIiwge1xuICAgICAgZGVzY3JpcHRpb246IFwiQ3VzdG9tQXV0aE1RVFQgQXJuXCIsXG4gICAgICB2YWx1ZTogY3VzdG9tQXV0aG9yaXplckxhbWJkYU1RVFQuZnVuY3Rpb25Bcm5cbiAgICB9KVxuXG4gIH1cbn1cbiJdfQ==