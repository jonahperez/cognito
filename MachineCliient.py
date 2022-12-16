import requests
import json
from ConnectionSettings import *

print(app_client_id)
 
body = {
    'grant_type': 'client_credentials',
    'client_id': app_client_id,
    'client_secret': app_client_secret,
    'scope': 'identity/Food'
}
 
response = requests.post(TOKEN_ENDPOINT, data=body)
token = json.loads(response.text)['access_token']

values = requests.post(API_ENDPOINT, headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json; charset=utf-8" })
print(values.text)

# use the following command to get the app-client-secret:
# aws cognito-idp describe-user-pool-client --user-pool-id <user-pool-id> --client-id client-id --query UserPoolClient.ClientSecret