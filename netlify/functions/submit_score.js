const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON input', error: error.message })
        };
    }

    const { user_id, score } = body;

    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7759627',
        password: 'gFtiNX8IUc',
        database: 'sql7759627',
        port: 3306
    });

    try {
        const query = 'INSERT INTO leaderboard (user_id, score) VALUES (?, ?)';
        await connection.execute(query, [user_id, score]);
        await connection.end();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Score submitted successfully' })
        };
    } catch (error) {
        await connection.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting score', error: error.message })
        };
    }
};
