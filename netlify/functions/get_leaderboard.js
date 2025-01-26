const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7759627',
        password: 'gFtiNX8IUc',
        database: 'sql7759627',
        port: 3306
    });

    try {
        const [rows, fields] = await connection.execute('SELECT user_id, MAX(score) as max_score FROM leaderboard GROUP BY user_id ORDER BY max_score DESC LIMIT 10');
        await connection.end();
        return {
            statusCode: 200,
            body: JSON.stringify(rows)
        };
    } catch (error) {
        await connection.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching leaderboard', error: error.message })
        };
    }
};
