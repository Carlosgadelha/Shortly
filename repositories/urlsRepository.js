import database from "../dataBase.js";

async function newShortenURL(userId, url, shortUrl) {

    return database.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [userId, url, shortUrl]);

}

async function getUrl(id) {
    
    const result = await database.query(`SELECT id, "shortUrl", "userId", url FROM urls WHERE id = $1`, [id]);
    return result.rows[0];
}

async function deleteUrl(id) {
    return database.query(`DELETE FROM urls WHERE id = $1`, [id]);	
}

async function getShortenURL(shortUrl) {

    const result = await database.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
    return result.rows[0].url;
}

async function updateVisits(shortUrl){
    return database.query(`UPDATE urls SET visits = visits + 1 WHERE "shortUrl" = $1`, [shortUrl]);
}

async function getTotalVisit(id) {
    const result = await database.query(`   SELECT users.id, users.name, SUM(urls.visits) 
                                            FROM users 
                                            JOIN urls ON users.id = urls."userId"
                                            WHERE users.id = $1
                                            GROUP BY users.id`, [id]);
    return result.rows[0];

}

async function getInfos(id) {
    const result = await database.query(`   SELECT urls.id, urls.url, urls."shortUrl", urls.visits
                                            FROM users 
                                            JOIN urls ON users.id = urls."userId"
                                            WHERE users.id = $1`, [id]);
    return result.rows;
}

async function getRank() {

    const result = await database.query(`   SELECT
                                                users.id,
                                                users.name,
                                                COUNT(urls.id) AS "linksCount",
                                                COALESCE(SUM(urls.visits),0) AS "visitCount"
                                            FROM
                                                users
                                                LEFT JOIN urls ON users.id = urls."userId"
                                                
                                            GROUP BY users.id
                                            ORDER BY  "visitCount" DESC 
                                            LIMIT 10`);
    return result.rows;
}

export const urlsRepository = {
    newShortenURL,
    getUrl,
    getShortenURL,
    updateVisits,
    deleteUrl,
	getTotalVisit,
    getInfos,
    getRank
}