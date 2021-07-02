const dynamodb = require('../helpers/db-client')


const worker = async () => {

    const locations = [
        {
            linkUrl: 'http://..'
        }
    ]

    const putReqs = locations.map(item=>({
        PutRequest: {
            item
        }
    }))


    await dynamodb.batchWrite({
        RequestItems: {
            'links-dev': putReqs
        }
    }).promise().then(()=>console.log('all done'))

}

worker()