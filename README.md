eTicket web service.

POST  https://eticket.ids.agency/eticket

| Param | Required | Type | Default 
| -- | -- | ---| --
| email | Yes | String | N/A
| lastname           | No       | String | N/A
| website            | No       | String | N/A
| company            | No       | String | N/A
| phone              | No       | String | N/A
| address            | No       | String | N/A
| city               | No       | String | N/A
| state              | No       | String | N/A
| zip                | No       | String | N/A
| passport           | No       | String | N/A
| nationality        | No       | String | N/A
| language           | No       | String | N/A
| dealstage          | No       | String | Provided Hubspot Partial Payment Stage Id 
| dealname           | No       | String | N/A
| pipeline           | No       | String | Provided Hubspot Pipeline Id 
| hubspot_owner_id   | No       | String | N/A
| closedate          | No       | Number (Unix Timestamp Ms) | N/A
| amount             | No       | Number | N/A
| dealtype           | No       | String | N/A
| departure_date     | No       | Number (Unix Timestamp Ms) | N/A
| arrival_date       | No       | Number (Unix Timestamp Ms) | N/A
| moneda             | No       | String | N/A
| isFullPayment      | No       | Boolean| false 
| adults             | No       | Number | N/A
| children           | No       | Number | N/A
| infants            | No       | Number | N/A

# Authentication

You will need to provide the signed certificate with your request.

Examples: 

### Curl 

curl -v -s -k --key ssl/client.key --cert ssl/client.crt https://localhost:5678

### Node with Axios

const httpsAgent = new https.Agent({
  cert: fs.readFileSync("./ssl/client.crt"),
  key: fs.readFileSync("./ssl/client.key"),
})

axios.post(url, { httpsAgent })

