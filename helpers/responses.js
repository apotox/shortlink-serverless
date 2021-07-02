const success = (entity = {}, statusCode = 200) => {
    return {
        statusCode,
        body: JSON.stringify(
            {
                success: true,
                ...entity
            },
            null,
            2
        ),
    }
}

const failed = (error, statusCode = 400) => {

    let entity = {
        success: false
    }

    if (error instanceof Error) {
        entity.message = error.message
        entity.stack = process.env.NODE_ENV == 'development' ? error.stack : ''
    } else {
        entity = {
            ...entity,
            ...error
        }
    }
    return {
        statusCode,
        body: JSON.stringify(
            entity,
            null,
            2
        ),
    }
}


const forwardIt = (url, statusCode = 302) => {

    return {
        statusCode,
        headers: {
            Location: url,
        }
    }
}

module.exports = {
    success,
    failed,
    forwardIt
}